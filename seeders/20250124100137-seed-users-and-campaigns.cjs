module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insertion de 20 utilisateurs
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Influenceur A',
        email: 'influenceurA@example.com',
        password: '$2a$10$hashedPassword',
        role: 'Influenceur',
        niche: 'Tech',
        followers: 5000,
        engagement_rate: 3.5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Influenceur B',
        email: 'influenceurB@example.com',
        password: '$2a$10$hashedPassword',
        role: 'Influenceur',
        niche: 'Fitness',
        followers: 12000,
        engagement_rate: 4.2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Influenceur C',
        email: 'influenceurC@example.com',
        password: '$2a$10$hashedPassword',
        role: 'Influenceur',
        niche: 'Fashion',
        followers: 8000,
        engagement_rate: 5.1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Influenceur D',
        email: 'influenceurD@example.com',
        password: '$2a$10$hashedPassword',
        role: 'Influenceur',
        niche: 'Food',
        followers: 15000,
        engagement_rate: 6.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Influenceur E',
        email: 'influenceurE@example.com',
        password: '$2a$10$hashedPassword',
        role: 'Influenceur',
        niche: 'Travel',
        followers: 25000,
        engagement_rate: 4.8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Ajoutez 15 autres influenceurs...
      {
        name: 'Influenceur F',
        email: 'influenceurF@example.com',
        password: '$2a$10$hashedPassword',
        role: 'Influenceur',
        niche: 'Health',
        followers: 50000,
        engagement_rate: 3.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Influenceur G',
        email: 'influenceurG@example.com',
        password: '$2a$10$hashedPassword',
        role: 'Influenceur',
        niche: 'Sports',
        followers: 10000,
        engagement_rate: 4.5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Marque A',
        email: 'marqueaG@example.com',
        password: '$2a$10$hashedPassword',
        role: 'Marque',
        niche: 'Sports',
        followers: 10000,
        engagement_rate: 4.5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Marque B',
        email: 'marqueab@example.com',
        password: '$2a$10$hashedPassword',
        role: 'Marque',
        niche: 'Sports',
        followers: 10000,
        engagement_rate: 4.5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 13 autres utilisateurs (influenceurs ou marques)
    ]);

    // Insertion de 20 campagnes
    await queryInterface.bulkInsert('Campaigns', [
      {
        title: 'Campagne Tech 2025',
        description: 'Promotion pour un gadget tech.',
        budget: 1000,
        objectifs: JSON.stringify({ views: 50000, conversions: 500 }),
        date_debut: new Date(),
        date_fin: new Date(new Date().setDate(new Date().getDate() + 30)),
        marque_id: 2, // ID de "Marque A"
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Campagne Fitness 2025',
        description: 'Lancement de produits fitness.',
        budget: 2000,
        objectifs: JSON.stringify({ views: 30000, conversions: 300 }),
        date_debut: new Date(),
        date_fin: new Date(new Date().setDate(new Date().getDate() + 60)),
        marque_id: 3, // ID de "Marque B"
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Campagne Mode 2025',
        description: 'Nouvelle collection printemps.',
        budget: 1500,
        objectifs: JSON.stringify({ views: 70000, conversions: 800 }),
        date_debut: new Date(),
        date_fin: new Date(new Date().setDate(new Date().getDate() + 45)),
        marque_id: 4, // ID de "Marque C"
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Campagne Alimentation 2025',
        description: 'Promotion de produits alimentaires sains.',
        budget: 1800,
        objectifs: JSON.stringify({ views: 40000, conversions: 400 }),
        date_debut: new Date(),
        date_fin: new Date(new Date().setDate(new Date().getDate() + 30)),
        marque_id: 5, // ID de "Marque D"
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Campagne Voyage 2025',
        description: 'Offre spéciale pour les voyages.',
        budget: 2500,
        objectifs: JSON.stringify({ views: 100000, conversions: 1000 }),
        date_debut: new Date(),
        date_fin: new Date(new Date().setDate(new Date().getDate() + 90)),
        marque_id: 6, // ID de "Marque E"
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Ajoutez 15 autres campagnes...
      {
        title: 'Campagne Sport 2025',
        description: 'Partenaire officiel des événements sportifs.',
        budget: 3000,
        objectifs: JSON.stringify({ views: 120000, conversions: 1500 }),
        date_debut: new Date(),
        date_fin: new Date(new Date().setDate(new Date().getDate() + 60)),
        marque_id: 7, // ID de "Marque F"
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 13 autres campagnes
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Campaigns', null, {});
  },
};
