const Product = require('#models/product');
const mockFacts = require('../mock.json')

module.exports = {
   seed: async (req, res) => {
      try {
         await Product.deleteMany();
         const data = mockFacts;
         await Product.insertMany([...data]);
         res.status(201).json({ ok: true });
      } catch (error) {
         res.status(500).json({ error });
      }
   },

   get: async (req, res) => {
      try {
         const products = await Product.find();
         res.status(200).json(products);
      } catch (error) {
         res.status(500).json({ error });
      }
   },

   add: async (req, res) => {
      try {
         const newFact = new Product(req.body);
         const product = await newFact.save();

         res.status(200).json({
            product,
            ok: true,
         });
      } catch (error) {
         console.log(error.message);
         res.status(500).json({ error: error.message });
      }
   },

   update: async (req, res) => {
      try {
         const _id = req.params.id;
         const product = await Product.findByIdAndUpdate(
            _id,
            {
               ...req.body,
            },
            { new: true }
         );
         res.status(200).json({ ok: true, product });
      } catch (error) {
         res.status(500).json({ error: "couldn't update" });
      }
   },

   delete: async (req, res) => {
      try {
         const id = req.params.id;
         await Product.deleteOne({
            _id: id,
         });
         res.status(200).json({ ok: true });
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   },
};
