import { DataSource } from "typeorm"

export const Db = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "todo_megak_proj_koncowy_nest",
    entities: ["dist/**/**.entity{.ts,.js}"],
    bigNumberStrings: false,
    logging: true,
    synchronize: true
})