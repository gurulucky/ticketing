module.exports = (sequelize, Sequelize) => {
    const Ticket = sequelize.define("ticket", {
        eventId: {
            type: Sequelize.INTEGER,
            // references:{
            //     model:'event',
            //     key:'id'
            // }
        },
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        from: {
            type: Sequelize.DATE
        },
        to: {
            type: Sequelize.DATE
        },
        price: {
            type: Sequelize.FLOAT
        },
        quantity: {
            type: Sequelize.INTEGER
        },
        sold: {
            type: Sequelize.INTEGER
        }
    });

    return Ticket;
};