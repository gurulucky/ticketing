module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
        email: {
            type: Sequelize.STRING
        },
        ticketId: {
            type: Sequelize.INTEGER,
            // references:{
            //     model:'ticket',
            //     key:'id'
            // }
        },
        quantity: {
            type: Sequelize.INTEGER
        },
        attendees: {
            type: Sequelize.STRING
        },
        orderDate: {
            type: Sequelize.DATE
        }
    });

    return Order;
};