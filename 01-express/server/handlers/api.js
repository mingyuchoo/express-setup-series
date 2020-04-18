/* PostgreSQL database */
var promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise
};
var pgp = require('pg-promise')(options);
var db = pgp(process.env.DATABASE_URL);

exports.index = function(req, res) {
    res.render('api/index', { title: 'API Puppy' });
};

// add query functions here
exports.getAllPuppies = function(req, res, next) {
  db.any('SELECT * FROM pups')
    .then(function(data) {
      res.status(200).json({
        status: 'success',
        data: data,
        message: 'Retrieved All puppies'
      });
    }).catch(function(error){
      return next(error);
    });
};

exports.getSinglePuppy = function(req, res, next) {
  var pupID = parseInt(req.params.id);
  db.one('SELECT * FROM pups WHERE id = $1', pupID)
    .then(function(data) {
      res.status(200).json({
        status: 'success',
        data: data,
        message: 'Retrieved ONE puppy'
      });
    }).catch(function(error) {
      return next(error);
    });
};

exports.createPuppy = function(req, res, next) {
  req.body.age = parseInt(req.body.age);
  db.none('INSERT INTO pups(name, breed, age, sex)' +
      'VALUES(${name}, ${breed}, ${age}, ${sex})',
    req.body)
    .then(function () {
      res.status(200).json({
        status: 'success',
        message: 'Inserted one puppy'
      });
    }).catch(function (error) {
      return next(error);
    });
};

exports.updatePuppy = function(req, res, next) {
  db.none('UPDATE pups SET name=$1, breed=$2, age=$3, sex=$4 WHERE id=$5',
          [
            req.body.name,
            req.body.breed,
            parseInt(req.body.age),
            req.body.sex,
            parseInt(req.params.id)
          ])
    .then(function() {
      res.status(200).json({
        status: 'success',
        message: 'Updated puppy'
      });
    }).catch(function(error) {
      return next(error);
    });
};

exports.removePuppy = function(req, res, next) {
  var pupID = parseInt(req.params.id);
  db.result('DELETE FROM pups WHERE id = $1', pupID)
    .then(function(result) {
      res.status(200).json({
        status: 'success',
        message: `Removed ${result.rowCount} puppy`
      });
    }).catch(function(error) {
      return next(error);
    });
};
