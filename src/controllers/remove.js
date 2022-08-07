const { findByIdService, removeService } = require("../services/courseService.js");

module.exports.handler = async (event) => {
  try {
    const id = event.pathParameters.id
    const course = await findByIdService(id);
    await removeService(course);
    let response = {
      statusCode: 201,
      body: serialize(course),
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