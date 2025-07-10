import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from './sequelize';
import Hotel from './hotel';
import RoomCategory from './roomCategory';

class Room extends Model<InferAttributes<Room>, InferCreationAttributes<Room>> {
  declare id: CreationOptional<number>;
  declare hotel_id: number;
  declare room_category_id: number;
  declare date_of_availability: Date;
  declare price: number;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
  declare deleted_at: CreationOptional<Date> | null;
  declare booking_id?: number | null;
}

Room.init(
  {
    id: {
      type: 'INTEGER',
      autoIncrement: true,
      primaryKey: true,
    },
    hotel_id: {
      type: 'INTEGER',
      allowNull: false,
      references: {
        model: Hotel,
        key: 'id',
      },
    },
    room_category_id: {
      type: 'INTEGER',
      allowNull: false,
      references: {
        model: RoomCategory,
        key: 'id',
      },
    },
    date_of_availability: {
      type: 'DATE',
      allowNull: false,
    },
    price: {
      type: 'INTEGER',
      allowNull: false,
    },
    created_at: {
      type: 'DATE',
      defaultValue: new Date(),
    },
    updated_at: {
      type: 'DATE',
      defaultValue: new Date(),
    },
    deleted_at: {
      type: 'DATE',
      defaultValue: null,
    },
    booking_id: {
      type: 'INTEGER',
      defaultValue: null,
    },
  },
  {
    tableName: 'rooms',
    sequelize: sequelize,
    underscored: true,
    timestamps: true,
  }
);

export default Room;