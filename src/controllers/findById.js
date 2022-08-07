const { findByIdService } = require("../services/courseService.js");

module.exports.handler = async (event) => {
  try {
    const id = event.pathParameters.id
    const course = await findByIdService(id);
    let response = {
      statusCode: 200,
      body: serialize(course),
      isBase64Encoded: false
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
