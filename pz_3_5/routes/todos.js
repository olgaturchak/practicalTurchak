const { Router } = require('express')

const {Position, Unit} = require("../models/Todo");
const Soldier = require('../models/Todo').Soldier
const Units = require('../models/Todo').Unit
const Positions = require('../models/Todo').Position
const SoldierMsql = require('../models/Todo').SoldierMsql
const UnitMsql = require('../models/Todo').UnitMsql
const PositionMsql = require('../models/Todo').PositionMsql

const router = Router()
const Sequelize = require('sequelize');

router.get('/', async (req, res) => {
    const todos = await Soldier.find({}).lean()

    res.render('index', {
        title: 'Todos list',
        isIndex: true,
        todos
    })
})

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create todo',
        isCreate: true
    })
})

router.post('/create', async (req, res) => {

    const unit = new Units({
        unit: req.body.unit
    })
    const position = new Positions({
        position: req.body.position
    })
    const todo = new Soldier({
        title: req.body.title,
        rank: req.body.rank,
        year: req.body.year,
        position: position,
        unit: unit
    })



    const createPosition = async () => {
        try {
            const position = await PositionMsql.create({
                position: req.body.position
            });
            console.log('Запис успішно додано position:');
            return position;
        } catch (error) {
            console.error('Помилка при додаванні запису:', error);
            throw error;
        }
    };
     const created_position = await createPosition();




    const createUnit = async () => {
        try {
            const unit = await UnitMsql.create({
                unit: req.body.unit
            });
            console.log('Запис успішно додано unit:');
            return unit;
        } catch (error) {
            console.error('Помилка при додаванні запису:', error);
            throw error;
        }
    };
    const created_unit = await createUnit();



    SoldierMsql.create({
        title: req.body.title,
        completed: false,
        rank: req.body.rank,
        year: req.body.year,
        position_id: created_position.dataValues.id,
        unit_id: created_unit.dataValues.id

    })
        .then((soldier) => {
            console.log('Запис успішно додано soldier:', soldier);
        })
        .catch((error) => {
            console.error('Помилка при додаванні запису:', error);
        });

    await todo.save()
    await unit.save()
    await position.save()

    res.redirect('/')
})

router.post('/complete', async (req, res) => {
    const todo = await Soldier.findById(req.body.id)
    const found_title = todo.title
    console.log(todo)
    todo.completed = !!req.body.completed
    await todo.save()

    const soldierId = req.body.id;
    await Soldier.findByIdAndRemove(soldierId);

    SoldierMsql.destroy({
        where: { title: found_title }
    })
        .then(() => {
            console.log('Значення успішно видалено');
        })
        .catch((error) => {
            console.error('Помилка при видаленні значення:', error);
        });


    res.redirect('/')
})

router.get('/inform', async (req, res) => {
    const todos = await Soldier.find({}).lean()
    res.render('inform', {
    title: 'Todos list',
    isIndex: true,
    todos
    })
})

router.get('/details/:id', async (req, res) => {

    const soldier = await Soldier.findById(req.params.id).populate('unit').exec();

    const title = soldier.title
    const rank = soldier.rank
    const year = soldier.year
    const position1 = await Position.findById(soldier.position)
    const unit1 = await Unit.findById(soldier.unit)

    const positionName = position1.position
    const unitName = unit1.unit

    res.render('details', { title, rank, year, positionName, unitName});

})

router.get('/editsoldier', async (req, res) => {
    const todos = await Soldier.find({}).lean()
    res.render('editsoldier', {
        title: 'Todos list',
        isIndex: true,
        todos
    })
})
router.get('/editsoldierform/:id', async (req, res) => {

    const soldier = await Soldier.findById(req.params.id).populate('unit').exec();
    const id = req.params.id
    const title = soldier.title
    const rank = soldier.rank
    const year = soldier.year
    const position1 = await Position.findById(soldier.position)
    const unit1 = await Unit.findById(soldier.unit)

    const positionName = position1.position
    const unitName = unit1.unit




    res.render('editsoldierform', { title, rank, year, positionName, unitName, id});

})

router.post('/editsoldierform/:id', async (req, res) => {

    const soldierId = req.params.id
    const title1 = req.body.title
    const rank1 = req.body.rank
    const year1 = req.body.year
    const unit1 = req.body.unit
    const position1 = req.body.position
    const soldier = await Soldier.findById(soldierId)
    const oldTitle = soldier.title
    console.log("Old name::: ", oldTitle)

    const unit = await Unit.findById(soldier.unit)
    const position = await Position.findById(soldier.position)



    SoldierMsql.update(
        {   title: title1,
            rank: rank1,
            year: year1
        },
        {
            where: { title: oldTitle }
        }
    )


    const sold = await SoldierMsql.findOne({
        where: { title: oldTitle },
        attributes: ['position_id', 'unit_id']
    });

    const positionId = sold.position_id;
    const unitId = sold.unit_id;

    PositionMsql.update(
        { position: position1 },
        {
            where: { id: positionId }
        }
    );

    UnitMsql.update(
        { unit: unit1 },
        {
            where: { id: unitId }
        }
    );

    soldier.title = title1;
    soldier.rank = rank1;
    soldier.year = year1;
    unit.unit = unit1
    position.position = position1
    await soldier.save();
    await unit.save();
    await position.save();

    res.redirect('/')
})


router.get('/editPosition', async (req, res) => {
    const todos = await Position.find({}).lean()
    const positions = todos
        .map(x => x.position);
    const uniqueArray = [...new Set(positions)]

    uniqueArray.forEach(x => console.log(x))
    res.render('editPosition', {
        isIndex: true,
        uniqueArray
    })
});
router.get('/editOnePosition/:position', async (req, res) => {
    const pos = req.params.position
    res.render('editOnePosition', { pos });
})

router.post('/editOnePosition/:position', async (req, res) => {
    const pos = req.params.position
    const position1 = req.body.position
    const positions = await Position.find({ position: pos });


    console.log("+++++++")

    for (const pos of positions) {
        pos.position = position1;
        await pos.save();
    }

    PositionMsql.update(
        { position: position1 },
        { where: { position: pos } }
    );


    res.redirect('/')
})

router.get('/editUnit', async (req, res) => {
    const todos = await Unit.find({}).lean()
    const units = todos
        .map(x => x.unit);
    const uniqueArray = [...new Set(units)]

    uniqueArray.forEach(x => console.log(x))
    res.render('editUnit', {
        isIndex: true,
        uniqueArray
    })
});
router.get('/editOneUnit/:unit', async (req, res) => {
    const unit = req.params.unit
    res.render('editOneUnit', { unit });
})

router.post('/editOneUnit/:unit', async (req, res) => {
    const unit = req.params.unit
    const unit1 = req.body.unit
    const units = await Unit.find({ unit: unit });

    console.log(units)

    console.log("+++++++")

    for (const un of units) {
        un.unit = unit1;
        await un.save();
    }

    UnitMsql.update(
        { unit: unit1 },
        { where: { unit: unit } }
    );

    res.redirect('/')
})

module.exports = router