const db = require('../../models');

exports.addFeaturedItem = async function(req, res, next) {
  try {
    let featuredItems = await db.FeaturedItems.find();
    const newRobeId = req.params.id;

    let isItemAlreadyFeatured = false;

    for (let item of featuredItems) {
      if (item.robeRef === newRobeId) {
        isItemAlreadyFeatured = true;
      }
    }

    if (!isItemAlreadyFeatured) {
      await db.FeaturedItems.create({ robeRef: newRobeId });
      const updatedFeaturedItems = await db.FeaturedItems.find();

      return res.status(200).json(updatedFeaturedItems);
    } else {
      return next({
        status: 400,
        message: 'Produsul este deja recomandat.'
      });
    }
  } catch (err) {
    return next(err);
  }
};

exports.removeFeaturedItem = async function(req, res, next) {
  try {
    await db.FeaturedItems.findOneAndDelete({ robeRef: req.params.id });

    return res.status(200).json(req.params.id);
  } catch (err) {
    return next(err);
  }
};
