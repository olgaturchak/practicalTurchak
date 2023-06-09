const mongoose = require('mongoose');
const mysql = require('mysql')
const Sequelize = require("sequelize");
const soldierSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    rank: {type: String, required:true},
    year: { type: String, required:true},
    position: { type: mongoose.Schema.Types.ObjectId, ref: 'Position' },
    unit: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit' }
})


const unitSchema = new mongoose.Schema({
    unit: {type: String, required: true}
})

const positionSchema = new mongoose.Schema({
    position: { type: String, required: true },

})

const Soldier = mongoose.model('Soldier', soldierSchema);
const Unit = mongoose.model('Unit', unitSchema);
const Position = mongoose.model('Position', positionSchema);

const sequelize = new Sequelize('sample_training', 'root', '1111', {
    host: 'localhost',
    dialect: 'mysql'
});


const UnitMsql = sequelize.define('unit', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    unit: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

UnitMsql.sync()

// Оголошення моделі таблиці positions
const PositionMsql   = sequelize.define('position', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    position: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

PositionMsql.sync()

const SoldierMsql = sequelize.define('Soldier', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    rank: {
        type: Sequelize.STRING,
        allowNull: false
    },
    year: {
        type: Sequelize.STRING,
        allowNull: false
    },
    position_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'positions',
            key: 'id'
        }
    },
    unit_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'units',
            key: 'id'
        }
    }
});

SoldierMsql.sync()

UnitMsql.hasMany(SoldierMsql, { foreignKey: 'unit_id' });
PositionMsql.hasMany(SoldierMsql, { foreignKey: 'position_id' });

// Створення таблиць в базі даних
sequelize.sync({ force: false })
    .then(() => {
        console.log('Таблиці створено');
    })
    .catch((error) => {
        console.error('Помилка при створенні таблиць:', error);
    });



module.exports = {Soldier, Unit, Position, SoldierMsql, PositionMsql, UnitMsql }
