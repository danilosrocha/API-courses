const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.COURSE_TABLE;

AWS.config.update({ region: "us-east-1" });

const save = async (course) => {
  const params = {
    TableName,
    Item: {
      'id': course.id,
      'name': course.name,
      'description': course.description,
      'teacher': course.teacher,
      'quantity': course.quantity,
      'year': course.year,
      'version': course.version,
      'activate': course.activate,
      'createdAt': course.createdAt,
      'updatedAt': course.updatedAt,
    },
  };
  return await dynamoDb.put(params).promise();
};

const update = async (course) => {
  const params = {
    TableName,
    Item: { ...course },
  };
  return await dynamoDb.put(params).promise();
};

const findAll = async () => {
  const params = {
    TableName,
    FilterExpression: "#act = :activate",
    ExpressionAttributeNames: { "#act": "activate" },
    ExpressionAttributeValues: { ":activate": true },
  };
  const items = await dynamoDb.scan(params).promise();
  return items.Items ? items.Items : undefined;
};

const findById = async (id) => {
  const params = {
    TableName,
    Key: { 'id': id },
  };
  const item = await dynamoDb.get(params).promise();
  const course = item.Item ? item.Item : undefined;
  return course && course.activate ? course : undefined;
};

module.exports = {
  save,
  update,
  findAll,
  findById,
};
