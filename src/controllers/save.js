const { saveService } = require("../services/courseService.js");

module.exports.handler = async (event) => {
  try {
    const canonical = JSON.parse(event.body)
    await saveService(canonical);
    let response = {
      statusCode: 201,
      body: serialize(canonical),
    };
    return response;
  } catch (err) {
    console.error(err);
    let response = {
      statusCode: 500,
      body: JSON.stringify(err),
    };
    return response;
  }
};
const serialize = (object) => {
    return JSON.stringify(object, null, 2)
}