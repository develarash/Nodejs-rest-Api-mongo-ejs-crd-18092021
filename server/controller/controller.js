var Userdb = require("../model/model");

// create and save new user
exports.create = (req, res) => {
    const merror=[];
  // validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // new user
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });
  // save user in the database
  user
    .save(user)
    .then((data) => {
        res.redirect("/");
    })
    .catch((err) => {
        if ( err.code == 11000 ) {
            res.send("user already exists")
            res.redirect('/');
            return;
        }
      res.status(500).send({
        message: err.message || "some error occured while creating a operation",
      });
    });
};
// retrieve and return all users/ retrive and return a single user
exports.find = (req, res) => {
    
    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

    
};

// update a new idetified user by id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }
  const id= req.params.id;
  Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false}).then(data=>{
      if(!data){
          res.status(404).send({message:`cannot update user with ${id} maybe user not found`})
      }else{
          res.send(data)
      }

  })
  .catch(err=>{
      res.status(500).send({message:"Error Update user information"})
  })
};
// Delete a user with specified id user
exports.delete = (req, res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{

                res.redirect("/");

            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}
