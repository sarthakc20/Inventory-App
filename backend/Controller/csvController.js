const csvData = require("../Model/csvModel");

const csvtojson = require("csvtojson");

exports.importFile = async (req, res) => {
  try {

    const data = [];

    csvtojson()
      .fromFile(req.file.path)
      .then(async (response) => {
        for (let i = 0; i < response.length; i++) {
            data.push({
                Part: response[i].Part,
                Alt_Part: response[i].Alt_Part,
                Name: response[i].Name,
                Name: response[i].Name,
                Brand: response[i].Brand,
                Model: response[i].Model,
                Engine: response[i].Engine,
                Car: response[i].Car,
                Loc_A: response[i].Loc_A,
                Loc_A_Stock: response[i].Loc_A_Stock,
                Loc_B: response[i].Loc_B,
                Loc_B_Stock: response[i].Loc_B_Stock,
                Unit: response[i].Unit,
                Value: response[i].Value,
                Rate: response[i].Rate,
                Remarks: response[i].Remarks,
            });
        }
        await csvData.insertMany(data);

      });
    res.send({
      status: 200,
      success: true,
      message: "Imported file successfully",
    });
  } catch (error) {
    res.send({ status: 400, success: false, message: error.message });
  }
};
