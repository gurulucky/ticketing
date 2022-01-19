module.exports = (sequelize, Sequelize) => {
    const Venue = sequelize.define("venue", {
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        country: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        link: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING
        }
    });

    return Venue;
};