// Import Inventory model
Inventory = require("./inventoryModel");

// Handle Get All Inventory
exports.index = function (req, res) {
  Inventory.get(function (err, inventory) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    } else {
      res.json({
        status: "success",
        message: "Inventory retrieved successfully",
        data: inventory,
      });
    }
  });
};

exports.csv = function (req, res) {
  Inventory.get(function (err, inventory) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    } else {
      const headers = [
        { label: "ID", key: "_id" },
        { label: "Name", key: "name" },
        { label: "Description", key: "description" },
        { label: "Amount", key: "amount" },
        { label: "Created At", key: "create_date" },
      ];
      let data = {
        inventory,
        headers,
      };
      res.json({
        status: "success",
        message: "Inventory csv format retrieved successfully",
        data: data,
      });
    }
  });
};

// Handle create new inventory item
exports.new = function (req, res) {
  let inventory = new Inventory();
  inventory.name = req.body.name ? req.body.name : Inventory.name;
  inventory.description = req.body.description;
  inventory.amount = req.body.amount;
  // save the inventory item and check for errors
  inventory.save(function (err) {
    if (err) {
      res.json(err);
    } else {
      res.json({
        message: "New Inventory item created!",
        data: inventory,
      });
    }
  });
};

// Handle view inventory information with ID
exports.view = function (req, res) {
  Inventory.findById(req.params.inventory_id, function (err, inventory) {
    if (err) {
      res.send(err);
    } else {
      res.json({
        message: "Inventory item details loading..",
        data: inventory,
      });
    }
  });
};

// Handle update inventory item
exports.update = function (req, res) {
  Inventory.findById(req.params.inventory_id, function (err, inventory) {
    if (err) {
      res.send(err);
    } else {
      inventory.name = req.body.name ? req.body.name : inventory.name;
      inventory.description = req.body.description;
      inventory.amount = req.body.amount;
      inventory.updated_date = Date.now;
      // save the updated inventory item and check for errors
      inventory.save(function (err) {
        if (err) {
          res.json(err);
        } else {
          res.json({
            message: "Inventory Info updated",
            data: inventory,
          });
        }
      });
    }
  });
};

// Handle delete inventory item
exports.delete = function (req, res) {
  Inventory.deleteOne(
    {
      _id: req.params.inventory_id,
    },
    function (err, inventory) {
      if (err) {
        res.send(err);
      } else {
        res.json({
          status: "success",
          message: "Inventory item deleted",
          data: inventory,
        });
      }
    }
  );
};
