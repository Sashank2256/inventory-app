const { Product, InventoryLog } = require('../../models');
const { Op } = require('sequelize');

const LOW_STOCK_THRESHOLD = 5;

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    await InventoryLog.create({
      productId: product.id,
      change: product.quantity,
      action: 'CREATE',
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const { search, minQty, maxQty, sortBy, order } = req.query;

    let where = {};

    // Search by product name
    if (search) {
      where.name = {
        [Op.like]: `%${search}%`,
      };
    }

    // Quantity filters
    if (minQty || maxQty) {
      where.quantity = {};
      if (minQty) where.quantity[Op.gte] = parseInt(minQty);
      if (maxQty) where.quantity[Op.lte] = parseInt(maxQty);
    }

    const products = await Product.findAll({
      where,
      order: sortBy
        ? [[sortBy, order === 'desc' ? 'DESC' : 'ASC']]
        : [],
    });

    const LOW_STOCK_THRESHOLD = 5;

    const lowStock = products.filter(
      (p) => p.quantity <= LOW_STOCK_THRESHOLD
    );

    res.json({
      total: products.length,
      products,
      lowStock,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const oldQuantity = product.quantity;

    await product.update(req.body);

    const change = product.quantity - oldQuantity;

    await InventoryLog.create({
      productId: product.id,
      change,
      action: 'UPDATE',
    });

    if (product.quantity <= LOW_STOCK_THRESHOLD) {
      console.log(`LOW STOCK ALERT: ${product.name}`);
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await InventoryLog.create({
      productId: product.id,
      change: -product.quantity,
      action: 'DELETE',
    });

    await product.destroy();

    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getAnalytics = async (req, res) => {
  try {
    const products = await Product.findAll();

    const totalProducts = products.length;

    const totalStock = products.reduce(
      (sum, p) => sum + p.quantity,
      0
    );

    const lowStockItems = products.filter(
      (p) => p.quantity <= 5
    ).length;

    const outOfStock = products.filter(
      (p) => p.quantity === 0
    ).length;

    res.json({
      totalProducts,
      totalStock,
      lowStockItems,
      outOfStock,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};