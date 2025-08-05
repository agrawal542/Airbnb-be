import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from './sequelize';
import Hotel from './hotel';

export enum RoomType {
  SINGLE = 'SINGLE',
  DOUBLE = 'DOUBLE',
  FAMILY = 'FAMILY',
  DELUXE = 'DELUXE',
  SUITE = 'SUITE',
}

class RoomCategory extends Model<
  InferAttributes<RoomCategory>,
  InferCreationAttributes<RoomCategory>
> {
  declare id: CreationOptional<number>;
  declare hotel_id: number;
  declare price: number;
  declare room_type: RoomType;
  declare room_count: number;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
  declare deleted_at: CreationOptional<Date> | null;
}

RoomCategory.init(
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
    price: {
      type: 'INTEGER',
      allowNull: false,
    },
    room_type: {
      type: 'ENUM',
      values: [...Object.values(RoomType)],
    },
    room_count: {
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
  },
  {
    tableName: 'room_categories',
    sequelize: sequelize,
    underscored: true,
    timestamps: true,
  }
);

export default RoomCategory;