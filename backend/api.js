// Initialize express router
let router = require("express").Router();

// Set default API response
router.get("/", function (req, res) {
  res.json({
    status: "Inventory System API Working",
    message: "Welcome to Inventory System RESTful API",
  });
});

// Import inventory controller
var inventoryController = require("./inventoryController");
// Inventory routes
router.route("/inventory").get(inventoryController.index).post(inventoryController.new);
router
  .route("/inventory/:inventory_id")
  .get(inventoryController.view)
  .patch(inventoryController.update)
  .put(inventoryController.update)
  .delete(inventoryController.delete);

// Extra feature: export to csv
router.route("/exportcsv").get(inventoryController.csv);

// Export API routes
module.exports = router;
