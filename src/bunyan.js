import bunyan from 'bunyan';
import hapiBunyan from 'hapi-bunyan';
import mongoose, { Schema } from 'mongoose';
import bunynanMongoStream from 'bunyan-mongodb-stream';

const LogSchema = new Schema({}, {
    strict: false
});
const LogModel = mongoose.model('Log', LogSchema);
const logEntryStream = bunynanMongoStream({ model: LogModel });

const options = {
  logger: bunyan.createLogger({
    name: `display-${process.env.NODE_ENV}`,
    streams: [
      {
        level: 'info',
        stream: process.stdout
      },
      {
        level: 'info',
        stream: logEntryStream
      }
    ]
  })
};

export default {
  register : hapiBunyan,
  options : options
};
