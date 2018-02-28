var tasks = require('../models').Tasks
var Op = require('Sequelize').Op;

module.exports = {
  findTaskById: function (req, res) {
    tasks.findById(req.body.id).then(data => {
      if (data.length === 0) {
        res.status(404).send('No data found')
      } else {
        res.status(200).json(data)
      }
    }).catch(error => {
      console.log(error)
    })
  },

  filterTasks: function (req, res) {
    tasks.findAndCountAll({
      where: {
        UserId: {
          [Op.like]: req.params.userId
        },
        status: {
          [Op.like]: req.params.status
        },
        project: {
          [Op.like]: req.params.projectId
        }
      },
      offset: req.params.page,
      limit: 10,
      order: [['created_date', 'DESC']]
    }).then(data => {
      if (data.length === 0) {
        res.status(404).send('No data found')
      } else {
        res.status(200).json(data)
      }
    }).catch(error => {
      console.log(error)
    })
  },

  addTask: function (req, res) {
    console.log(req.body)
    tasks.create(req.body).then(() => {
      res.status(200).send('Post added')
    }).catch(error => {
      console.log(error)
    })
  },

  updateTask: function (req, res) {
    console.log(req.params)
    tasks.update(req.body,
      {
        where: {
          id: req.params.id
        }
      }).then((data) => {
      if (data[0] === 0) {
        res.status(404).send('No affected data')
      } else {
        res.status(200).send('Post updated')
      }
    }).catch(error => {
      console.log(error)
    })
  }
}