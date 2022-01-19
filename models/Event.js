module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define("event", {
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        start: {
            type: Sequelize.DATE
        },
        venueId: {
            type: Sequelize.INTEGER
        },
        categoryId: {
            type: Sequelize.INTEGER
        },
        image: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },
        ownerId: {
            type: Sequelize.INTEGER,
            // references:{
            //     model: 'user',
            //     key:'id'
            // }
        }
    });

    return Event;
};