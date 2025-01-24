module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('Users', [
            {
                name: 'Influenceur A',
                email: 'influenceurA@example.com',
                password: '$2a$10$hashedPasswordHere', // bcrypt hash
                role: 'Influenceur',
                niche: 'Tech',
                followers: 5000,
                engagement_rate: 2.5,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Marque A',
                email: 'marqueA@example.com',
                password: '$2a$10$hashedPasswordHere', // bcrypt hash
                role: 'Marque',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);

        await queryInterface.bulkInsert('Campaigns', [
            {
                title: 'Campagne Tech 2025',
                description: 'Promotion pour un nouveau gadget tech.',
                budget: 1000,
                objectifs: JSON.stringify({ views: 50000, conversions: 500 }),
                date_debut: new Date(),
                date_fin: new Date(new Date().setDate(new Date().getDate() + 30)),
                marque_id: 2, // Correspond à "Marque A"
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },
    down: async (queryInterface) => {
        await queryInterface.bulkDelete('Users', null, {});
        await queryInterface.bulkDelete('Campaigns', null, {});
    },
};
