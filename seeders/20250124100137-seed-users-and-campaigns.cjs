module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Génération de 20 utilisateurs (Influenceurs et Marques)
    const users = [];
    for (let i = 1; i <= 10; i++) {
      users.push({
        name: `Influenceur ${i}`,
        email: `influenceur${i}@example.com`,
        password: '$2a$10$hashedPassword',
        role: 'Influenceur',
        niche: `Niche ${i}`,
        followers: Math.floor(Math.random() * 100000) + 5000, // Entre 5000 et 105000 followers
        engagement_rate: (Math.random() * 5 + 1).toFixed(2), // Entre 1% et 6%
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    for (let i = 1; i <= 10; i++) {
      users.push({
        name: `Marque ${i}`,
        email: `marque${i}@example.com`,
        password: '$2a$10$hashedPassword',
        role: 'Marque',
        niche: `Secteur ${i}`,
        followers: null, // Les marques n'ont pas de followers
        engagement_rate: null, // Les marques n'ont pas de taux d'engagement
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('Users', users);

    // Génération de 20 campagnes
    const campaigns = [];
    for (let i = 1; i <= 20; i++) {
      campaigns.push({
        title: `Campagne ${i}`,
        description: `Description de la campagne ${i}`,
        budget: Math.floor(Math.random() * 5000) + 1000, // Entre 1000 et 6000
        objectifs: JSON.stringify({
          views: Math.floor(Math.random() * 100000) + 10000, // Entre 10k et 110k
          conversions: Math.floor(Math.random() * 1000) + 100, // Entre 100 et 1100
        }),
        date_debut: new Date(),
        date_fin: new Date(new Date().setDate(new Date().getDate() + Math.floor(Math.random() * 90) + 30)), // Entre 30 et 120 jours
        marque_id: Math.floor(Math.random() * 10) + 11, // ID aléatoire parmi les marques (IDs 11 à 20)
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('Campaigns', campaigns);

    // Récupérer les campagnes insérées
    const insertedCampaigns = await queryInterface.sequelize.query(
        'SELECT id FROM `Campaigns`;',
        { type: Sequelize.QueryTypes.SELECT }
    );

    // Génération des performances pour chaque campagne
    const performances = insertedCampaigns.map((campaign) => ({
      campaign_id: campaign.id,
      views: Math.floor(Math.random() * 50000) + 5000, // Entre 5000 et 55000
      clicks: Math.floor(Math.random() * 10000) + 100, // Entre 100 et 10100
      conversions: Math.floor(Math.random() * 500) + 50, // Entre 50 et 550
      engagement_rate: (Math.random() * 5 + 1).toFixed(2), // Entre 1% et 6%
      revenue_generated: Math.floor(Math.random() * 10000) + 500, // Entre 500 et 10500
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Performances', performances);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Performances', null, {});
    await queryInterface.bulkDelete('Campaigns', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  },
};
