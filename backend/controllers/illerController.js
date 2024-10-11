const iller_ilceler = require('../models/form_models/il_ilce');
exports.getAllCitiesAndDistricts = async (req, res) => {
    try {
        const cities = await iller_ilceler.find(); 
        res.status(200).json(cities);
    } catch (error) {
        res.status(500).json({ message: 'Veriler alınırken bir hata oluştu.' });
    }
};
