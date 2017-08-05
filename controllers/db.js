const Project = require('../models/Project')

function createProject(user, settings) {
  let project = new Project({
    owner: new User(user),
    pages: [],
    settings: settings
  })
  project.save()
}

function readProjects(key) {
  return Project.find({ 'owner.key': key }).exec()
}

function readProject(id) {
  return Project.find({ '_id': id }).exec()
}

function updateProject(id, update) {
  return Project.update({ '_id': id }, update).exec()
}

function removeProject(id) {
  return Project.remove({ '_id': id }).exec()
}

module.exports = { createProject, readProjects, readProject, updateProject, removeProject }
