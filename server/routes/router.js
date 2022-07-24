const { Route } = require('express');
const express=require('express');
const route=express.Router();

const services=require('../services/render');
const controller=require('../controller/controller');

route.get("/",services.homeRoutes)
/**
 * @description Root Route
 * @method GET /
 */

  route.get("/add-user",services.add_user)
  /**
 * @description Add User
 * @method GET /add-user
 */
  route.get("/update-user",services.update_user)
  /**
 * @description Update User
 * @method GET /update-user
 */


//   API
route.post('/api/users',controller.create)
route.get('/api/users',controller.find)
route.put('/api/users/:id',controller.update)
route.get('/api/delete/:id', controller.delete);

  module.exports=route