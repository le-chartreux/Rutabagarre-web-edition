import {Controller} from "./controller";
import {Model} from "~app/ts/model";
import {View} from "~app/ts/view";

let model = new Model()
let view = new View()
let controller = new Controller(model, view)
controller.setup()

