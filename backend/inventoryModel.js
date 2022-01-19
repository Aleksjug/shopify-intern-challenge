var mongoose = require("mongoose");
// Setup schema
var inventorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    amount: {
      type: String,
      required: true,
    },
    create_date: {
      type: Date,
      default: Date.now,
    },
    update_date: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "inventory" }
);
// Export Contact model
var Inventory = (module.exports = mongoose.model("Inventory", inventorySchema));
module.exports.get = function (callback, limit) {
  Inventory.find(callback).limit(limit);
};
