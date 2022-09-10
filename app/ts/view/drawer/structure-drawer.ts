import {PhysicalElementDrawer} from "~app/ts/view/drawer/physical-element-drawer";
import {PhysicalElement} from "~app/ts/world/physical-element";
import * as THREE from 'three'
import {StructureType} from "~app/ts/world/structure/structure-type";
import {Structure} from "~app/ts/world/structure/structure";

class StructureDrawer implements PhysicalElementDrawer{

    private loadedGeometries: Map<StructureType, THREE.BoxGeometry>
    private loadedMaterials: Map<StructureType, THREE.Material>

    public constructor() {
        this.loadedGeometries = new Map<StructureType, THREE.BoxGeometry>()
        this.loadedMaterials = new Map<StructureType, THREE.Material>()
    }

    get3dObject(structure: Structure): THREE.Mesh {
        if (! this.loadedGeometries.has(structure.structureType)) {
            // adding the new geometry to the loaded geometries
            this.loadedGeometries.set(structure.structureType, new THREE.BoxGeometry())
        }
        let geometry = this.loadedGeometries.get(structure.structureType) as THREE.BoxGeometry

        if (! this.loadedMaterials.has(structure.structureType)) {
            // adding the new material to the loaded materials
            this.loadedMaterials.set(structure.structureType, new THREE.MeshStandardMaterial({color: 0xFFAD00}))
        }
        let material = this.loadedMaterials.get(structure.structureType) as THREE.Material

        return new THREE.Mesh(geometry, material)
    }
}

export {StructureDrawer}
