// Copyright 2021 Icosa Gallery
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Loader, FileLoader, RawShaderMaterial, RepeatWrapping, TextureLoader, Vector3, Vector4 } from "three";

export class TiltShaderLoader extends Loader {
    constructor( manager ) {
        super( manager );
    }
    
    async load(brushName, onLoad, onProgress, onError ) {
        const scope = this;

        const isAlreadyLoaded = loadedMaterials[brushName];
        
        if (isAlreadyLoaded !== undefined) {
            onLoad( scope.parse( isAlreadyLoaded ) );
            return;
        }
        
		const loader = new FileLoader( this.manager );
		loader.setPath( this.path );
		loader.setResponseType( 'text' );
		loader.setWithCredentials( this.withCredentials );

        const textureLoader = new TextureLoader(this.manager);
        textureLoader.setPath(this.path);
        textureLoader.setWithCredentials( this.withCredentials );

        const materialParams = tiltBrushMaterialParams[brushName];

        materialParams.vertexShader = await loader.loadAsync(materialParams.vertexShader);
        materialParams.fragmentShader = await loader.loadAsync(materialParams.fragmentShader);

        if (materialParams.uniforms.u_MainTex) {
            const mainTex = await textureLoader.loadAsync(materialParams.uniforms.u_MainTex.value);
            mainTex.name = `${brushName}_MainTex`;
            mainTex.wrapS = RepeatWrapping;
            mainTex.wrapT = RepeatWrapping;
            mainTex.flipY = false;
            materialParams.uniforms.u_MainTex.value = mainTex;
        }

        if (materialParams.uniforms.u_BumpMap) {
            const bumpMap = await textureLoader.loadAsync(materialParams.uniforms.u_BumpMap.value);
            bumpMap.name = `${brushName}_BumpMap`;
            bumpMap.wrapS = RepeatWrapping;
            bumpMap.wrapT = RepeatWrapping;
            bumpMap.flipY = false;
            materialParams.uniforms.u_BumpMap.value = bumpMap;
        }

        if (materialParams.uniforms.u_AlphaMask) {
            const alphaMask = await textureLoader.loadAsync(materialParams.uniforms.u_AlphaMask.value);
            alphaMask.name = `${brushName}_AlphaMask`;
            alphaMask.wrapS = RepeatWrapping;
            alphaMask.wrapT = RepeatWrapping;
            alphaMask.flipY = false;
            materialParams.uniforms.u_AlphaMask.value = alphaMask;
        }

        loadedMaterials[brushName] = materialParams;

        onLoad( scope.parse( materialParams ) );
    }

    parse( materialParams ) {
        return new RawShaderMaterial( materialParams );
    }
}

const loadedMaterials = {}

const tiltBrushMaterialParams = {
    "BlocksBasic" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0, 0, 0) },
            u_Shininess: { value: 0.1500 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_Cutoff: { value: 0.2 }
        },
        vertexShader: "BlocksBasic-0e87b49c-6546-3a34-3a44-8a556d7d6c3e/BlocksBasic-0e87b49c-6546-3a34-3a44-8a556d7d6c3e-v10.0-vertex.glsl",
        fragmentShader: "BlocksBasic-0e87b49c-6546-3a34-3a44-8a556d7d6c3e/BlocksBasic-0e87b49c-6546-3a34-3a44-8a556d7d6c3e-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0,
        extensions: { derivatives: true }
    },
    "BlocksGem" : {
        uniforms: {
            u_SceneLight_0_matrix: {value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1]},
            u_SceneLight_1_matrix: {value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1]},
            u_ambient_light_color: {value: new Vector4(0.3922, 0.3922, 0.3922, 1)},
            u_SceneLight_0_color: {value: new Vector4(0.7780, 0.8157, 0.9914, 1)},
            u_SceneLight_1_color: {value: new Vector4(0.4282, 0.4212, 0.3459, 1)},
            u_SpecColor: {value: new Vector3(0, 0, 0)},
            u_Shininess: {value: 0.1500},
            u_fogColor: {value: new Vector3(0.0196, 0.0196, 0.0196)},
            u_fogDensity: {value: 0},
            u_Cutoff: { value: 0.2 }
        },
        vertexShader: "BlocksGem-232998f8-d357-47a2-993a-53415df9be10/BlocksGem-232998f8-d357-47a2-993a-53415df9be10-v10.0-vertex.glsl",
        fragmentShader: "BlocksGem-232998f8-d357-47a2-993a-53415df9be10/BlocksGem-232998f8-d357-47a2-993a-53415df9be10-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0,
        extensions: { derivatives: true }
    },
    "BlocksGlass" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0, 0, 0) },
            u_Shininess: { value: 0.1500 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_Cutoff: { value: 0.2 }
        },
        vertexShader: "BlocksGlass-3d813d82-5839-4450-8ddc-8e889ecd96c7/BlocksGlass-3d813d82-5839-4450-8ddc-8e889ecd96c7-v10.0-vertex.glsl",
        fragmentShader: "BlocksGlass-3d813d82-5839-4450-8ddc-8e889ecd96c7/BlocksGlass-3d813d82-5839-4450-8ddc-8e889ecd96c7-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: false,
        depthTest: true,
        blending: 2,
        extensions: { derivatives: true }
    },
    "Bubbles" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_MainTex: { value: "Bubbles-89d104cd-d012-426b-b5b3-bbaee63ac43c/Bubbles-89d104cd-d012-426b-b5b3-bbaee63ac43c-v10.0-MainTex.png" },
        },
        vertexShader: "Bubbles-89d104cd-d012-426b-b5b3-bbaee63ac43c/Bubbles-89d104cd-d012-426b-b5b3-bbaee63ac43c-v10.0-vertex.glsl",
        fragmentShader: "Bubbles-89d104cd-d012-426b-b5b3-bbaee63ac43c/Bubbles-89d104cd-d012-426b-b5b3-bbaee63ac43c-v10.0-fragment.glsl",
        side: 2,
        transparent: true,
        depthFunc: 2,
        depthWrite: false,
        depthTest: true,
        blending: 2
    },
    "CelVinyl" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0, 0, 0) },
            u_Shininess: { value: 0.1500 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_MainTex: { value: "CelVinyl-700f3aa8-9a7c-2384-8b8a-ea028905dd8c/CelVinyl-700f3aa8-9a7c-2384-8b8a-ea028905dd8c-v10.0-MainTex.png" },
            u_Cutoff: { value: 0.2 }
        },
        vertexShader: "CelVinyl-700f3aa8-9a7c-2384-8b8a-ea028905dd8c/CelVinyl-700f3aa8-9a7c-2384-8b8a-ea028905dd8c-v10.0-vertex.glsl",
        fragmentShader: "CelVinyl-700f3aa8-9a7c-2384-8b8a-ea028905dd8c/CelVinyl-700f3aa8-9a7c-2384-8b8a-ea028905dd8c-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0,
        extensions: { derivatives: true }
    },
    "ChromaticWave" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_time: { value: new Vector4() },
            u_EmissionGain: { value: 0.45 },
        },
        vertexShader: "ChromaticWave-0f0ff7b2-a677-45eb-a7d6-0cd7206f4816/ChromaticWave-0f0ff7b2-a677-45eb-a7d6-0cd7206f4816-v10.0-vertex.glsl",
        fragmentShader: "ChromaticWave-0f0ff7b2-a677-45eb-a7d6-0cd7206f4816/ChromaticWave-0f0ff7b2-a677-45eb-a7d6-0cd7206f4816-v10.0-fragment.glsl",
        side: 2,
        transparent: true,
        depthFunc: 2,
        depthWrite: false,
        depthTest: true,
        blending: 5,
        blendDstAlpha: 201,
        blendDst: 201,
        blendEquationAlpha: 100,
        blendEquation: 100,
        blendSrcAlpha: 201,
        blendSrc: 201,
    },
    "CoarseBristles" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0, 0, 0) },
            u_Shininess: { value: 0.1500 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_MainTex: { value: "CoarseBristles-1161af82-50cf-47db-9706-0c3576d43c43/CoarseBristles-1161af82-50cf-47db-9706-0c3576d43c43-v10.0-MainTex.png" },
            u_Cutoff: { value: 0.2 }
        },
        vertexShader: "CoarseBristles-1161af82-50cf-47db-9706-0c3576d43c43/CoarseBristles-1161af82-50cf-47db-9706-0c3576d43c43-v10.0-vertex.glsl",
        fragmentShader: "CoarseBristles-1161af82-50cf-47db-9706-0c3576d43c43/CoarseBristles-1161af82-50cf-47db-9706-0c3576d43c43-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0,
        extensions: { derivatives: true }
    },
    "Comet" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0, 0, 0) },
            u_Shininess: { value: 0.1500 },
            u_time: { value: new Vector4() },
            u_Speed: { value: 1 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_MainTex: { value: "Comet-1caa6d7d-f015-3f54-3a4b-8b5354d39f81/Comet-1caa6d7d-f015-3f54-3a4b-8b5354d39f81-v10.0-MainTex.png" },
            u_AlphaMask: { value: "Comet-1caa6d7d-f015-3f54-3a4b-8b5354d39f81/Comet-1caa6d7d-f015-3f54-3a4b-8b5354d39f81-v10.0-AlphaMask.png" },
            u_AlphaMask_TexelSize: { value: new Vector4(0.0156, 1, 64, 1)},
            u_Cutoff: { value: 0.2 }
        },
        vertexShader: "Comet-1caa6d7d-f015-3f54-3a4b-8b5354d39f81/Comet-1caa6d7d-f015-3f54-3a4b-8b5354d39f81-v10.0-vertex.glsl",
        fragmentShader: "Comet-1caa6d7d-f015-3f54-3a4b-8b5354d39f81/Comet-1caa6d7d-f015-3f54-3a4b-8b5354d39f81-v10.0-fragment.glsl",
        side: 2,
        transparent: true,
        depthFunc: 2,
        depthWrite: false,
        depthTest: true,
        blending: 2,
        extensions: { derivatives: true }
    },
    "DiamondHull" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_time: { value: new Vector4() },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            cameraPosition: { value: new Vector3() },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_MainTex: { value: "DiamondHull-c8313697-2563-47fc-832e-290f4c04b901/DiamondHull-c8313697-2563-47fc-832e-290f4c04b901-v10.0-MainTex.png" },
        },
        vertexShader: "DiamondHull-c8313697-2563-47fc-832e-290f4c04b901/DiamondHull-c8313697-2563-47fc-832e-290f4c04b901-v10.0-vertex.glsl",
        fragmentShader: "DiamondHull-c8313697-2563-47fc-832e-290f4c04b901/DiamondHull-c8313697-2563-47fc-832e-290f4c04b901-v10.0-fragment.glsl",
        side: 2,
        transparent: true,
        depthFunc: 2,
        depthWrite: false,
        depthTest: true,
        blending: 5,
        blendDstAlpha: 201,
        blendDst: 201,
        blendEquationAlpha: 100,
        blendEquation: 100,
        blendSrcAlpha: 201,
        blendSrc: 201,
    },
    "Disco" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_time: { value: new Vector4() },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_Shininess: { value: 0.6500 },
            u_SpecColor: { value: new Vector3(0.5147, 0.5147, 0.5147) },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 }
        },
        vertexShader: "Disco-4391aaaa-df73-4396-9e33-31e4e4930b27/Disco-4391aaaa-df73-4396-9e33-31e4e4930b27-v10.0-vertex.glsl",
        fragmentShader: "Disco-4391aaaa-df73-4396-9e33-31e4e4930b27/Disco-4391aaaa-df73-4396-9e33-31e4e4930b27-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0
    },
    "DotMarker" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0, 0, 0) },
            u_Shininess: { value: 0.1500 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_MainTex: { value: "DotMarker-d1d991f2-e7a0-4cf1-b328-f57e915e6260/DotMarker-d1d991f2-e7a0-4cf1-b328-f57e915e6260-v10.0-MainTex.png" },
            u_Cutoff: { value: 0.2 }
        },
        vertexShader: "DotMarker-d1d991f2-e7a0-4cf1-b328-f57e915e6260/DotMarker-d1d991f2-e7a0-4cf1-b328-f57e915e6260-v10.0-vertex.glsl",
        fragmentShader: "DotMarker-d1d991f2-e7a0-4cf1-b328-f57e915e6260/DotMarker-d1d991f2-e7a0-4cf1-b328-f57e915e6260-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0,
        extensions: { derivatives: true }
    },
    "Dots" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_TintColor: { value: new Vector4(1, 1, 1, 1) },
            u_EmissionGain: { value: 300 },
            u_BaseGain: { value: 0.4 },
            u_MainTex: { value: "Dots-6a1cf9f9-032c-45ec-9b1d-a6680bee30f7/Dots-6a1cf9f9-032c-45ec-9b1d-a6680bee30f7-v10.0-MainTex.png" }
        },
        vertexShader: "Dots-6a1cf9f9-032c-45ec-9b1d-a6680bee30f7/Dots-6a1cf9f9-032c-45ec-9b1d-a6680bee30f7-v10.0-vertex.glsl",
        fragmentShader: "Dots-6a1cf9f9-032c-45ec-9b1d-a6680bee30f7/Dots-6a1cf9f9-032c-45ec-9b1d-a6680bee30f7-v10.0-fragment.glsl",
        side: 2,
        transparent: true,
        depthFunc: 2,
        depthWrite: false,
        depthTest: true,
        blending: 2
    },
    "DoubleTaperedFlat" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0, 0, 0) },
            u_Shininess: { value: 0.1500 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_Cutoff: { value: 0.2 }
        },
        vertexShader: "DoubleTaperedFlat-0d3889f3-3ede-470c-8af4-f44813306126/DoubleTaperedFlat-0d3889f3-3ede-470c-8af4-f44813306126-v10.0-vertex.glsl",
        fragmentShader: "DoubleTaperedFlat-0d3889f3-3ede-470c-8af4-f44813306126/DoubleTaperedFlat-0d3889f3-3ede-470c-8af4-f44813306126-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0,
        extensions: { derivatives: true }
    },
    "DoubleTaperedMarker" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0, 0, 0) },
            u_Shininess: { value: 0.1500 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_Cutoff: { value: 0.2 }
        },
        vertexShader: "DoubleTaperedMarker-0d3889f3-3ede-470c-8af4-de4813306126/DoubleTaperedMarker-0d3889f3-3ede-470c-8af4-de4813306126-v10.0-vertex.glsl",
        fragmentShader: "DoubleTaperedMarker-0d3889f3-3ede-470c-8af4-de4813306126/DoubleTaperedMarker-0d3889f3-3ede-470c-8af4-de4813306126-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0,
        extensions: { derivatives: true }
    },
    "DuctTape" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0, 0, 0) },
            u_Shininess: { value: 0.1500 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_BumpMap_TexelSize: { value: new Vector4(0.0010, 0.0078, 1024, 128) },
            u_BumpMap: { value: "DuctTape-3ca16e2f-bdcd-4da2-8631-dcef342f40f1/DuctTape-3ca16e2f-bdcd-4da2-8631-dcef342f40f1-v10.0-BumpMap.png" },
            u_MainTex: { value: "DuctTape-3ca16e2f-bdcd-4da2-8631-dcef342f40f1/DuctTape-3ca16e2f-bdcd-4da2-8631-dcef342f40f1-v10.0-MainTex.png" },
            u_Cutoff: { value: 0.2 }
        },
        vertexShader: "DuctTape-d0262945-853c-4481-9cbd-88586bed93cb/DuctTape-d0262945-853c-4481-9cbd-88586bed93cb-v10.0-vertex.glsl",
        fragmentShader: "DuctTape-d0262945-853c-4481-9cbd-88586bed93cb/DuctTape-d0262945-853c-4481-9cbd-88586bed93cb-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0,
        extensions: { derivatives: true }
    },
    "Electricity" : {
        uniforms: {
            u_time: { value: new Vector4() },
            u_DisplacementIntensity: { value: 2 },
            u_EmissionGain: { value: 0.2 }
        },
        vertexShader: "Electricity-f6e85de3-6dcc-4e7f-87fd-cee8c3d25d51/Electricity-f6e85de3-6dcc-4e7f-87fd-cee8c3d25d51-v10.0-vertex.glsl",
        fragmentShader: "Electricity-f6e85de3-6dcc-4e7f-87fd-cee8c3d25d51/Electricity-f6e85de3-6dcc-4e7f-87fd-cee8c3d25d51-v10.0-fragment.glsl",
        side: 2,
        transparent: true,
        depthFunc: 2,
        depthWrite: false,
        depthTest: true,
        blending: 2,
        extensions: { derivatives: true }
    },
    "Embers" : {
        uniforms: {
            u_time: { value: new Vector4() },
            u_ScrollRate: { value: 0.6 },
            u_ScrollDistance: { value: new Vector3(-0.2, 0.6, 0) },
            u_ScrollJitterIntensity: { value: 0.03 },
            u_ScrollJitterFrequency: { value: 5 },
            u_TintColor: { value: new Vector4(1, 1, 1, 1) },
            u_MainTex: { value: "Embers-02ffb866-7fb2-4d15-b761-1012cefb1360/Embers-02ffb866-7fb2-4d15-b761-1012cefb1360-v10.0-MainTex.png" },
            u_Cutoff: { value: 0.2 }
        },
        vertexShader: "Embers-02ffb866-7fb2-4d15-b761-1012cefb1360/Embers-02ffb866-7fb2-4d15-b761-1012cefb1360-v10.0-vertex.glsl",
        fragmentShader: "Embers-02ffb866-7fb2-4d15-b761-1012cefb1360/Embers-02ffb866-7fb2-4d15-b761-1012cefb1360-v10.0-fragment.glsl",
        side: 2,
        transparent: true,
        depthFunc: 2,
        depthWrite: false,
        depthTest: true,
        blending: 2
    },
    "EnvironmentDiffuse" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0, 0, 0) },
            u_Shininess: { value: 0.1500 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_Cutoff: { value: 0.2 }
        },
        vertexShader: "EnvironmentDiffuse-0ad58bbd-42bc-484e-ad9a-b61036ff4ce7/EnvironmentDiffuse-0ad58bbd-42bc-484e-ad9a-b61036ff4ce7-v1.0-vertex.glsl",
        fragmentShader: "EnvironmentDiffuse-0ad58bbd-42bc-484e-ad9a-b61036ff4ce7/EnvironmentDiffuse-0ad58bbd-42bc-484e-ad9a-b61036ff4ce7-v1.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0,
        extensions: { derivatives: true }
    },
    "EnvironmentDiffuseLightMap" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0, 0, 0) },
            u_Shininess: { value: 0.1500 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_Cutoff: { value: 0.2 }
        },
        vertexShader: "EnvironmentDiffuseLightMap-d01d9d6c-9a61-4aba-8146-5891fafb013b/EnvironmentDiffuseLightMap-d01d9d6c-9a61-4aba-8146-5891fafb013b-v1.0-vertex.glsl",
        fragmentShader: "EnvironmentDiffuseLightMap-d01d9d6c-9a61-4aba-8146-5891fafb013b/EnvironmentDiffuseLightMap-d01d9d6c-9a61-4aba-8146-5891fafb013b-v1.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0,
        extensions: { derivatives: true }
    },
    "Fire" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_time: { value: new Vector4() },
            u_EmissionGain: { value: 0.5 },
            u_MainTex: { value: "Fire-cb92b597-94ca-4255-b017-0e3f42f12f9e/Fire-cb92b597-94ca-4255-b017-0e3f42f12f9e-v10.0-MainTex.png" }
        },
        vertexShader: "Fire-cb92b597-94ca-4255-b017-0e3f42f12f9e/Fire-cb92b597-94ca-4255-b017-0e3f42f12f9e-v10.0-vertex.glsl",
        fragmentShader: "Fire-cb92b597-94ca-4255-b017-0e3f42f12f9e/Fire-cb92b597-94ca-4255-b017-0e3f42f12f9e-v10.0-fragment.glsl",
        side: 2,
        transparent: true,
        depthFunc: 2,
        depthWrite: false,
        depthTest: true,
        blending: 5,
        blendDstAlpha: 201,
        blendDst: 201,
        blendEquationAlpha: 100,
        blendEquation: 100,
        blendSrcAlpha: 201,
        blendSrc: 201
    },
    "Flat" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0, 0, 0) },
            u_Shininess: { value: 0.1500 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_Cutoff: { value: 0.2 }
        },
        vertexShader: "Flat-2d35bcf0-e4d8-452c-97b1-3311be063130/Flat-2d35bcf0-e4d8-452c-97b1-3311be063130-v10.0-vertex.glsl",
        fragmentShader: "Flat-2d35bcf0-e4d8-452c-97b1-3311be063130/Flat-2d35bcf0-e4d8-452c-97b1-3311be063130-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 5,
        blendDstAlpha: 201,
        blendDst: 201,
        blendEquationAlpha: 100,
        blendEquation: 100,
        blendSrcAlpha: 201,
        blendSrc: 201,
    },
    "Highlighter" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0, 0, 0) },
            u_Shininess: { value: 0.1500 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_MainTex: { value: "Highlighter-cf019139-d41c-4eb0-a1d0-5cf54b0a42f3/Highlighter-cf019139-d41c-4eb0-a1d0-5cf54b0a42f3-v10.0-MainTex.png" },
            u_Cutoff: { value: 0.2 }
        },
        vertexShader: "Highlighter-cf019139-d41c-4eb0-a1d0-5cf54b0a42f3/Highlighter-cf019139-d41c-4eb0-a1d0-5cf54b0a42f3-v10.0-vertex.glsl",
        fragmentShader: "Highlighter-cf019139-d41c-4eb0-a1d0-5cf54b0a42f3/Highlighter-cf019139-d41c-4eb0-a1d0-5cf54b0a42f3-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: false,
        depthTest: true,
        blending: 2,
        extensions: { derivatives: true }
    },
    "Hypercolor" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0, 0, 0) },
            u_Shininess: { value: 0.1500 },
            u_time: { value: new Vector4() },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_BumpMap_TexelSize: { value: new Vector4(0.0010, 0.0078, 1024, 128) },
            u_BumpMap: { value: "Hypercolor-dce872c2-7b49-4684-b59b-c45387949c5c/Hypercolor-dce872c2-7b49-4684-b59b-c45387949c5c-v10.0-BumpMap.png" },
            u_MainTex: { value: "Hypercolor-dce872c2-7b49-4684-b59b-c45387949c5c/Hypercolor-dce872c2-7b49-4684-b59b-c45387949c5c-v10.0-MainTex.png" },
            u_Cutoff: { value: 0.2 }
        },
        vertexShader: "Hypercolor-dce872c2-7b49-4684-b59b-c45387949c5c/Hypercolor-dce872c2-7b49-4684-b59b-c45387949c5c-v10.0-vertex.glsl",
        fragmentShader: "Hypercolor-dce872c2-7b49-4684-b59b-c45387949c5c/Hypercolor-dce872c2-7b49-4684-b59b-c45387949c5c-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0,
        extensions: { derivatives: true }
    },
    "HyperGrid" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_TintColor: { value: new Vector4(1, 1, 1, 1) },
            u_MainTex: { value: "HyperGrid-6a1cf9f9-032c-45ec-9b6e-a6680bee32e9/HyperGrid-6a1cf9f9-032c-45ec-9b6e-a6680bee32e9-v10.0-MainTex.png" }
        },
        vertexShader: "HyperGrid-6a1cf9f9-032c-45ec-9b6e-a6680bee32e9/HyperGrid-6a1cf9f9-032c-45ec-9b6e-a6680bee32e9-v10.0-vertex.glsl",
        fragmentShader: "HyperGrid-6a1cf9f9-032c-45ec-9b6e-a6680bee32e9/HyperGrid-6a1cf9f9-032c-45ec-9b6e-a6680bee32e9-v10.0-fragment.glsl",
        side: 2,
        transparent: true,
        depthFunc: 2,
        depthWrite: false,
        depthTest: true,
        blending: 2,
        extensions: { derivatives: true }
    },
    "Icing" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0, 0, 0) },
            u_Shininess: { value: 0.1500 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_BumpMap_TexelSize: { value: new Vector4(0.0010, 0.0078, 1024, 128) },
            u_BumpMap: { value: "Icing-2f212815-f4d3-c1a4-681a-feeaf9c6dc37/Icing-2f212815-f4d3-c1a4-681a-feeaf9c6dc37-v10.0-BumpMap.png" },
            u_MainTex: { value: "Icing-2f212815-f4d3-c1a4-681a-feeaf9c6dc37/Icing-2f212815-f4d3-c1a4-681a-feeaf9c6dc37-v10.0-BumpMap.png" },
            u_Cutoff: { value: 0.2 }
        },
        vertexShader: "Icing-2f212815-f4d3-c1a4-681a-feeaf9c6dc37/Icing-2f212815-f4d3-c1a4-681a-feeaf9c6dc37-v10.0-vertex.glsl",
        fragmentShader: "Icing-2f212815-f4d3-c1a4-681a-feeaf9c6dc37/Icing-2f212815-f4d3-c1a4-681a-feeaf9c6dc37-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0,
        extensions: { derivatives: true }
    },
    "Ink" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0, 0, 0) },
            u_Shininess: { value: 0.1500 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_BumpMap_TexelSize: { value: new Vector4(0.0010, 0.0078, 1024, 128) },
            u_BumpMap: { value: "Ink-c0012095-3ffd-4040-8ee1-fc180d346eaa/Ink-c0012095-3ffd-4040-8ee1-fc180d346eaa-v10.0-BumpMap.png" },
            u_MainTex: { value: "Ink-c0012095-3ffd-4040-8ee1-fc180d346eaa/Ink-c0012095-3ffd-4040-8ee1-fc180d346eaa-v10.0-MainTex.png" },
            u_Cutoff: { value: 0.2 }
        },
        vertexShader: "Ink-f5c336cf-5108-4b40-ade9-c687504385ab/Ink-f5c336cf-5108-4b40-ade9-c687504385ab-v10.0-vertex.glsl",
        fragmentShader: "Ink-f5c336cf-5108-4b40-ade9-c687504385ab/Ink-f5c336cf-5108-4b40-ade9-c687504385ab-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0,
        extensions: { derivatives: true }
    },
    "Leaves" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0, 0, 0) },
            u_Shininess: { value: 0.1500 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_BumpMap_TexelSize: { value: new Vector4(0.0010, 0.0078, 1024, 128) },
            u_BumpMap: { value: "Leaves-ea19de07-d0c0-4484-9198-18489a3c1487/Leaves-ea19de07-d0c0-4484-9198-18489a3c1487-v10.0-BumpMap.png" },
            u_MainTex: { value: "Leaves-ea19de07-d0c0-4484-9198-18489a3c1487/Leaves-ea19de07-d0c0-4484-9198-18489a3c1487-v10.0-MainTex.png" },
            u_Cutoff: { value: 0.2 }
        },
        vertexShader: "Leaves-ea19de07-d0c0-4484-9198-18489a3c1487/Leaves-ea19de07-d0c0-4484-9198-18489a3c1487-v10.0-vertex.glsl",
        fragmentShader: "Leaves-ea19de07-d0c0-4484-9198-18489a3c1487/Leaves-ea19de07-d0c0-4484-9198-18489a3c1487-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0,
        extensions: { derivatives: true }
    },
    "Light" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_MainTex: { value: "Light-2241cd32-8ba2-48a5-9ee7-2caef7e9ed62/Light-2241cd32-8ba2-48a5-9ee7-2caef7e9ed62-v10.0-MainTex.png" },
            u_EmissionGain: { value: 0.45 },
        },
        vertexShader: "Light-2241cd32-8ba2-48a5-9ee7-2caef7e9ed62/Light-2241cd32-8ba2-48a5-9ee7-2caef7e9ed62-v10.0-vertex.glsl",
        fragmentShader: "Light-2241cd32-8ba2-48a5-9ee7-2caef7e9ed62/Light-2241cd32-8ba2-48a5-9ee7-2caef7e9ed62-v10.0-fragment.glsl",
        side: 2,
        transparent: true,
        depthFunc: 2,
        depthWrite: false,
        depthTest: true,
        blending: 5,
        blendDstAlpha: 201,
        blendDst: 201,
        blendEquationAlpha: 100,
        blendEquation: 100,
        blendSrcAlpha: 201,
        blendSrc: 201,
    },
    "LightWire" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0, 0, 0) },
            u_time: { value: new Vector4() },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_MainTex: { value: "LightWire-4391aaaa-df81-4396-9e33-31e4e4930b27/LightWire-4391aaaa-df81-4396-9e33-31e4e4930b27-v10.0-MainTex.png" },
            u_Cutoff: { value: 0.2 }
        },
        vertexShader: "LightWire-4391aaaa-df81-4396-9e33-31e4e4930b27/LightWire-4391aaaa-df81-4396-9e33-31e4e4930b27-v10.0-vertex.glsl",
        fragmentShader: "LightWire-4391aaaa-df81-4396-9e33-31e4e4930b27/LightWire-4391aaaa-df81-4396-9e33-31e4e4930b27-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0
    },
    "Lofted" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0, 0, 0) },
            u_Shininess: { value: 0.1500 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_Cutoff: { value: 0.2 }
        },
        vertexShader: "Lofted-d381e0f5-3def-4a0d-8853-31e9200bcbda/Lofted-d381e0f5-3def-4a0d-8853-31e9200bcbda-v10.0-vertex.glsl",
        fragmentShader: "Lofted-d381e0f5-3def-4a0d-8853-31e9200bcbda/Lofted-d381e0f5-3def-4a0d-8853-31e9200bcbda-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0,
        extensions: { derivatives: true }
    },
    "Marker" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0, 0, 0) },
            u_Shininess: { value: 0.1500 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_MainTex: { value: "Marker-429ed64a-4e97-4466-84d3-145a861ef684/Marker-429ed64a-4e97-4466-84d3-145a861ef684-v10.0-MainTex.png" },
            u_Cutoff: { value: 0.2 }
        },
        vertexShader: "Marker-429ed64a-4e97-4466-84d3-145a861ef684/Marker-429ed64a-4e97-4466-84d3-145a861ef684-v10.0-vertex.glsl",
        fragmentShader: "Marker-429ed64a-4e97-4466-84d3-145a861ef684/Marker-429ed64a-4e97-4466-84d3-145a861ef684-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0,
        extensions: { derivatives: true }
    },
    "MatteHull" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 }
        },
        vertexShader: "MatteHull-79348357-432d-4746-8e29-0e25c112e3aa/MatteHull-79348357-432d-4746-8e29-0e25c112e3aa-v10.0-vertex.glsl",
        fragmentShader: "MatteHull-79348357-432d-4746-8e29-0e25c112e3aa/MatteHull-79348357-432d-4746-8e29-0e25c112e3aa-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0,
    },
    "NeonPulse" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_time: { value: new Vector4() },
            u_EmissionGain: { value: 0.45 },
        },
        vertexShader: "NeonPulse-b2ffef01-eaaa-4ab5-aa64-95a2c4f5dbc6/NeonPulse-b2ffef01-eaaa-4ab5-aa64-95a2c4f5dbc6-v10.0-vertex.glsl",
        fragmentShader: "NeonPulse-b2ffef01-eaaa-4ab5-aa64-95a2c4f5dbc6/NeonPulse-b2ffef01-eaaa-4ab5-aa64-95a2c4f5dbc6-v10.0-fragment.glsl",
        side: 2,
        transparent: true,
        depthFunc: 2,
        depthWrite: false,
        depthTest: true,
        blending: 5,
        blendDstAlpha: 201,
        blendDst: 201,
        blendEquationAlpha: 100,
        blendEquation: 100,
        blendSrcAlpha: 201,
        blendSrc: 201,
    },
    "OilPaint": {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0, 0, 0) },
            u_Shininess: { value: 0.1500 },
            u_Cutoff: { value: 0 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_BumpMap_TexelSize: { value: new Vector4(0.0020, 0.0020, 512, 512) },
            u_MainTex: { value: "OilPaint-f72ec0e7-a844-4e38-82e3-140c44772699/OilPaint-f72ec0e7-a844-4e38-82e3-140c44772699-v10.0-MainTex.png" },
            u_BumpMap: { value: "OilPaint-f72ec0e7-a844-4e38-82e3-140c44772699/OilPaint-f72ec0e7-a844-4e38-82e3-140c44772699-v10.0-BumpMap.png" }
        },
        vertexShader: "OilPaint-f72ec0e7-a844-4e38-82e3-140c44772699/OilPaint-f72ec0e7-a844-4e38-82e3-140c44772699-v10.0-vertex.glsl",
        fragmentShader: "OilPaint-f72ec0e7-a844-4e38-82e3-140c44772699/OilPaint-f72ec0e7-a844-4e38-82e3-140c44772699-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0
    },
    "Paper" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0, 0, 0) },
            u_Shininess: { value: 0.1500 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_BumpMap_TexelSize: { value: new Vector4(0.0010, 0.0078, 1024, 128) },
            u_BumpMap: { value: "Paper-759f1ebd-20cd-4720-8d41-234e0da63716/Paper-759f1ebd-20cd-4720-8d41-234e0da63716-v10.0-BumpMap.png" },
            u_MainTex: { value: "Paper-759f1ebd-20cd-4720-8d41-234e0da63716/Paper-759f1ebd-20cd-4720-8d41-234e0da63716-v10.0-MainTex.png" },
            u_Cutoff: { value: 0.2 }
        },
        vertexShader: "Paper-f1114e2e-eb8d-4fde-915a-6e653b54e9f5/Paper-f1114e2e-eb8d-4fde-915a-6e653b54e9f5-v10.0-vertex.glsl",
        fragmentShader: "Paper-f1114e2e-eb8d-4fde-915a-6e653b54e9f5/Paper-f1114e2e-eb8d-4fde-915a-6e653b54e9f5-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0,
        extensions: { derivatives: true }
    },
    "PbrTemplate" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0, 0, 0) },
            u_Shininess: { value: 0.1500 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_Cutoff: { value: 0.2 }
        },
        vertexShader: "PbrTemplate-f86a096c-2f4f-4f9d-ae19-81b99f2944e0/PbrTemplate-f86a096c-2f4f-4f9d-ae19-81b99f2944e0-v1.0-vertex.glsl",
        fragmentShader: "PbrTemplate-f86a096c-2f4f-4f9d-ae19-81b99f2944e0/PbrTemplate-f86a096c-2f4f-4f9d-ae19-81b99f2944e0-v1.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0,
        extensions: { derivatives: true }
    },
    "PbrTransparentTemplate" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0, 0, 0) },
            u_Shininess: { value: 0.1500 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_Cutoff: { value: 0.2 }
        },
        vertexShader: "PbrTransparentTemplate-19826f62-42ac-4a9e-8b77-4231fbd0cfbf/PbrTransparentTemplate-19826f62-42ac-4a9e-8b77-4231fbd0cfbf-v1.0-vertex.glsl",
        fragmentShader: "PbrTransparentTemplate-19826f62-42ac-4a9e-8b77-4231fbd0cfbf/PbrTransparentTemplate-19826f62-42ac-4a9e-8b77-4231fbd0cfbf-v1.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0,
        extensions: { derivatives: true }
    },
    "Petal" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0, 0, 0) },
            u_Shininess: { value: 0.1500 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_Cutoff: { value: 0.2 }
        },
        vertexShader: "Petal-e0abbc80-0f80-e854-4970-8924a0863dcc/Petal-e0abbc80-0f80-e854-4970-8924a0863dcc-v10.0-vertex.glsl",
        fragmentShader: "Petal-e0abbc80-0f80-e854-4970-8924a0863dcc/Petal-e0abbc80-0f80-e854-4970-8924a0863dcc-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0,
        extensions: { derivatives: true }
    },
    "Plasma" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0, 0, 0) },
            u_Shininess: { value: 0.1500 },
            u_time: { value: new Vector4() },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_MainTex: { value: "Plasma-c33714d1-b2f9-412e-bd50-1884c9d46336/Plasma-c33714d1-b2f9-412e-bd50-1884c9d46336-v10.0-MainTex.png" },
            u_Cutoff: { value: 0.2 }
        },
        vertexShader: "Plasma-c33714d1-b2f9-412e-bd50-1884c9d46336/Plasma-c33714d1-b2f9-412e-bd50-1884c9d46336-v10.0-vertex.glsl",
        fragmentShader: "Plasma-c33714d1-b2f9-412e-bd50-1884c9d46336/Plasma-c33714d1-b2f9-412e-bd50-1884c9d46336-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0,
        extensions: { derivatives: true }
    },
    "Rainbow" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_time: { value: new Vector4() },
            u_EmissionGain: { value: 0.45 },
        },
        vertexShader: "Rainbow-ad1ad437-76e2-450d-a23a-e17f8310b960/Rainbow-ad1ad437-76e2-450d-a23a-e17f8310b960-v10.0-vertex.glsl",
        fragmentShader: "Rainbow-ad1ad437-76e2-450d-a23a-e17f8310b960/Rainbow-ad1ad437-76e2-450d-a23a-e17f8310b960-v10.0-fragment.glsl",
        side: 2,
        transparent: true,
        depthFunc: 2,
        depthWrite: false,
        depthTest: true,
        blending: 5,
        blendDstAlpha: 201,
        blendDst: 201,
        blendEquationAlpha: 100,
        blendEquation: 100,
        blendSrcAlpha: 201,
        blendSrc: 201,
    },
    "ShinyHull" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0.1985, 0.1985, 0.1985) },
            u_Shininess: { value: 0.7430 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_Cutoff: { value: 0.2 }
        },
        vertexShader: "ShinyHull-faaa4d44-fcfb-4177-96be-753ac0421ba3/ShinyHull-faaa4d44-fcfb-4177-96be-753ac0421ba3-v10.0-vertex.glsl",
        fragmentShader: "ShinyHull-faaa4d44-fcfb-4177-96be-753ac0421ba3/ShinyHull-faaa4d44-fcfb-4177-96be-753ac0421ba3-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0,
        extensions: { derivatives: true }
    },
    "Smoke": {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_TintColor: { value: new Vector4(1, 1, 1, 1) },
            u_MainTex: { value: "Smoke-70d79cca-b159-4f35-990c-f02193947fe8/Smoke-70d79cca-b159-4f35-990c-f02193947fe8-v10.0-MainTex.png" }
        },
        vertexShader: "Smoke-70d79cca-b159-4f35-990c-f02193947fe8/Smoke-70d79cca-b159-4f35-990c-f02193947fe8-v10.0-vertex.glsl",
        fragmentShader: "Smoke-70d79cca-b159-4f35-990c-f02193947fe8/Smoke-70d79cca-b159-4f35-990c-f02193947fe8-v10.0-fragment.glsl",
        side: 2,
        transparent: true,
        depthFunc: 2,
        depthWrite: false,
        depthTest: true,
        blending: 2
    },
    "Snow" : {
        uniforms: {
            u_time: { value: new Vector4() },
            u_ScrollRate: { value: 0.2 },
            u_ScrollDistance: { value: new Vector3(0, -0.3, 0) },
            u_ScrollJitterIntensity: { value: 0.01 },
            u_ScrollJitterFrequency: { value: 12 },
            u_TintColor: { value: new Vector4(1, 1, 1, 1) },
            u_MainTex: { value: "Snow-d902ed8b-d0d1-476c-a8de-878a79e3a34c/Snow-d902ed8b-d0d1-476c-a8de-878a79e3a34c-v10.0-MainTex.png" },
        },
        vertexShader: "Snow-d902ed8b-d0d1-476c-a8de-878a79e3a34c/Snow-d902ed8b-d0d1-476c-a8de-878a79e3a34c-v10.0-vertex.glsl",
        fragmentShader: "Snow-d902ed8b-d0d1-476c-a8de-878a79e3a34c/Snow-d902ed8b-d0d1-476c-a8de-878a79e3a34c-v10.0-fragment.glsl",
        side: 2,
        transparent: true,
        depthFunc: 2,
        depthWrite: false,
        depthTest: true,
        blending: 2
    },
    "SoftHighlighter" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_MainTex: { value: "SoftHighlighter-accb32f5-4509-454f-93f8-1df3fd31df1b/SoftHighlighter-accb32f5-4509-454f-93f8-1df3fd31df1b-v10.0-MainTex.png" },
            u_Cutoff: { value: 0.2 },
        },
        vertexShader: "SoftHighlighter-accb32f5-4509-454f-93f8-1df3fd31df1b/SoftHighlighter-accb32f5-4509-454f-93f8-1df3fd31df1b-v10.0-vertex.glsl",
        fragmentShader: "SoftHighlighter-accb32f5-4509-454f-93f8-1df3fd31df1b/SoftHighlighter-accb32f5-4509-454f-93f8-1df3fd31df1b-v10.0-fragment.glsl",
        side: 2,
        transparent: true,
        depthFunc: 2,
        depthWrite: false,
        depthTest: true,
        blending: 5,
        blendDstAlpha: 201,
        blendDst: 201,
        blendEquationAlpha: 100,
        blendEquation: 100,
        blendSrcAlpha: 201,
        blendSrc: 201,
    },
    "Spikes" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0, 0, 0) },
            u_Shininess: { value: 0.1500 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_Cutoff: { value: 0.2 }
        },
        vertexShader: "Spikes-cf7f0059-7aeb-53a4-2b67-c83d863a9ffa/Spikes-cf7f0059-7aeb-53a4-2b67-c83d863a9ffa-v10.0-vertex.glsl",
        fragmentShader: "Spikes-cf7f0059-7aeb-53a4-2b67-c83d863a9ffa/Spikes-cf7f0059-7aeb-53a4-2b67-c83d863a9ffa-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0,
        extensions: { derivatives: true }
    },
    "Splatter" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_MainTex: { value: "Splatter-7a1c8107-50c5-4b70-9a39-421576d6617e/Splatter-7a1c8107-50c5-4b70-9a39-421576d6617e-v10.0-MainTex.png" },
            u_Cutoff: { value: 0.2 },
        },
        vertexShader: "Splatter-7a1c8107-50c5-4b70-9a39-421576d6617e/Splatter-7a1c8107-50c5-4b70-9a39-421576d6617e-v10.0-vertex.glsl",
        fragmentShader: "Splatter-7a1c8107-50c5-4b70-9a39-421576d6617e/Splatter-7a1c8107-50c5-4b70-9a39-421576d6617e-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0
    },
    "Stars" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0, 0, 0) },
            u_Shininess: { value: 0.1500 },
            u_time: { value: new Vector4() },
            u_SparkleRate: { value: 5.3 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_MainTex: { value: "Stars-0eb4db27-3f82-408d-b5a1-19ebd7d5b711/Stars-0eb4db27-3f82-408d-b5a1-19ebd7d5b711-v10.0-MainTex.png" },
            u_Cutoff: { value: 0.2 }
        },
        vertexShader: "Stars-0eb4db27-3f82-408d-b5a1-19ebd7d5b711/Stars-0eb4db27-3f82-408d-b5a1-19ebd7d5b711-v10.0-vertex.glsl",
        fragmentShader: "Stars-0eb4db27-3f82-408d-b5a1-19ebd7d5b711/Stars-0eb4db27-3f82-408d-b5a1-19ebd7d5b711-v10.0-fragment.glsl",
        side: 2,
        transparent: true,
        depthFunc: 2,
        depthWrite: false,
        depthTest: true,
        blending: 2,
        extensions: { derivatives: true }
    },
    "Streamers" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_EmissionGain: { value: 0.4 },
            u_time: { value: new Vector4() },
            u_MainTex: { value: "Streamers-44bb800a-fbc3-4592-8426-94ecb05ddec3/Streamers-44bb800a-fbc3-4592-8426-94ecb05ddec3-v10.0-MainTex.png" }
        },
        vertexShader: "Streamers-44bb800a-fbc3-4592-8426-94ecb05ddec3/Streamers-44bb800a-fbc3-4592-8426-94ecb05ddec3-v10.0-vertex.glsl",
        fragmentShader: "Streamers-44bb800a-fbc3-4592-8426-94ecb05ddec3/Streamers-44bb800a-fbc3-4592-8426-94ecb05ddec3-v10.0-fragment.glsl",
        side: 2,
        transparent: true,
        depthFunc: 2,
        depthWrite: false,
        depthTest: true,
        blending: 2
    },
    "Taffy" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0, 0, 0) },
            u_Shininess: { value: 0.1500 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_MainTex: { value: "Taffy-0077f88c-d93a-42f3-b59b-b31c50cdb414/Taffy-0077f88c-d93a-42f3-b59b-b31c50cdb414-v10.0-MainTex.png" },
            u_Cutoff: { value: 0.2 }
        },
        vertexShader: "Taffy-0077f88c-d93a-42f3-b59b-b31c50cdb414/Taffy-0077f88c-d93a-42f3-b59b-b31c50cdb414-v10.0-vertex.glsl",
        fragmentShader: "Taffy-0077f88c-d93a-42f3-b59b-b31c50cdb414/Taffy-0077f88c-d93a-42f3-b59b-b31c50cdb414-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0,
        extensions: { derivatives: true }
    },
    "TaperedFlat" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0, 0, 0) },
            u_Shininess: { value: 0.1500 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_MainTex: { value: "TaperedFlat-b468c1fb-f254-41ed-8ec9-57030bc5660c/TaperedFlat-b468c1fb-f254-41ed-8ec9-57030bc5660c-v10.0-MainTex.png" },
            u_Cutoff: { value: 0.2 }
        },
        vertexShader: "TaperedFlat-b468c1fb-f254-41ed-8ec9-57030bc5660c/TaperedFlat-b468c1fb-f254-41ed-8ec9-57030bc5660c-v10.0-vertex.glsl",
        fragmentShader: "TaperedFlat-b468c1fb-f254-41ed-8ec9-57030bc5660c/TaperedFlat-b468c1fb-f254-41ed-8ec9-57030bc5660c-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0,
        extensions: { derivatives: true }
    },
    "TaperedMarker" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0, 0, 0) },
            u_Shininess: { value: 0.1500 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_MainTex: { value: "TaperedMarker-d90c6ad8-af0f-4b54-b422-e0f92abe1b3c/TaperedMarker-d90c6ad8-af0f-4b54-b422-e0f92abe1b3c-v10.0-MainTex.png" },
            u_Cutoff: { value: 0.2 }
        },
        vertexShader: "TaperedMarker-d90c6ad8-af0f-4b54-b422-e0f92abe1b3c/TaperedMarker-d90c6ad8-af0f-4b54-b422-e0f92abe1b3c-v10.0-vertex.glsl",
        fragmentShader: "TaperedMarker-d90c6ad8-af0f-4b54-b422-e0f92abe1b3c/TaperedMarker-d90c6ad8-af0f-4b54-b422-e0f92abe1b3c-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0,
        extensions: { derivatives: true }
    },
    "TaperedMarker_Flat" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0, 0, 0) },
            u_Shininess: { value: 0.1500 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_MainTex: { value: "TaperedMarker_Flat-1a26b8c0-8a07-4f8a-9fac-d2ef36e0cad0/TaperedMarker_Flat-1a26b8c0-8a07-4f8a-9fac-d2ef36e0cad0-v10.0-MainTex.png" },
            u_Cutoff: { value: 0.2 }
        },
        vertexShader: "TaperedMarker_Flat-1a26b8c0-8a07-4f8a-9fac-d2ef36e0cad0/TaperedMarker_Flat-1a26b8c0-8a07-4f8a-9fac-d2ef36e0cad0-v10.0-vertex.glsl",
        fragmentShader: "TaperedMarker_Flat-1a26b8c0-8a07-4f8a-9fac-d2ef36e0cad0/TaperedMarker_Flat-1a26b8c0-8a07-4f8a-9fac-d2ef36e0cad0-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0,
        extensions: { derivatives: true }
    },
    "ThickPaint" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0, 0, 0) },
            u_Shininess: { value: 0.1500 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_BumpMap_TexelSize: { value: new Vector4(0.0010, 0.0078, 1024, 128) },
            u_BumpMap: { value: "ThickPaint-75b32cf0-fdd6-4d89-a64b-e2a00b247b0f/ThickPaint-75b32cf0-fdd6-4d89-a64b-e2a00b247b0f-v10.0-BumpMap.png" },
            u_MainTex: { value: "ThickPaint-75b32cf0-fdd6-4d89-a64b-e2a00b247b0f/ThickPaint-75b32cf0-fdd6-4d89-a64b-e2a00b247b0f-v10.0-MainTex.png" },
            u_Cutoff: { value: 0.2 }
        },
        vertexShader: "ThickPaint-75b32cf0-fdd6-4d89-a64b-e2a00b247b0f/ThickPaint-75b32cf0-fdd6-4d89-a64b-e2a00b247b0f-v10.0-vertex.glsl",
        fragmentShader: "ThickPaint-75b32cf0-fdd6-4d89-a64b-e2a00b247b0f/ThickPaint-75b32cf0-fdd6-4d89-a64b-e2a00b247b0f-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0,
        extensions: { derivatives: true }
    },
    "Toon" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 }
        },
        vertexShader: "Toon-4391385a-df73-4396-9e33-31e4e4930b27/Toon-4391385a-df73-4396-9e33-31e4e4930b27-v10.0-vertex.glsl",
        fragmentShader: "Toon-4391385a-df73-4396-9e33-31e4e4930b27/Toon-4391385a-df73-4396-9e33-31e4e4930b27-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0,
    },
    "UnlitHull" : {
        uniforms: {
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 }
        },
        vertexShader: "UnlitHull-a8fea537-da7c-4d4b-817f-24f074725d6d/UnlitHull-a8fea537-da7c-4d4b-817f-24f074725d6d-v10.0-vertex.glsl",
        fragmentShader: "UnlitHull-a8fea537-da7c-4d4b-817f-24f074725d6d/UnlitHull-a8fea537-da7c-4d4b-817f-24f074725d6d-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0,
    },
    "VelvetInk" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0, 0, 0) },
            u_Shininess: { value: 0.1500 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_MainTex: { value: "VelvetInk-d229d335-c334-495a-a801-660ac8a87360/VelvetInk-d229d335-c334-495a-a801-660ac8a87360-v10.0-MainTex.png" },
            u_Cutoff: { value: 0.2 }
        },
        vertexShader: "VelvetInk-d229d335-c334-495a-a801-660ac8a87360/VelvetInk-d229d335-c334-495a-a801-660ac8a87360-v10.0-vertex.glsl",
        fragmentShader: "VelvetInk-d229d335-c334-495a-a801-660ac8a87360/VelvetInk-d229d335-c334-495a-a801-660ac8a87360-v10.0-fragment.glsl",
        side: 2,
        transparent: true,
        depthFunc: 2,
        depthWrite: false,
        depthTest: true,
        blending: 2,
        extensions: { derivatives: true }
    },
    "Waveform" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0, 0, 0) },
            u_Shininess: { value: 0.1500 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_time: { value: new Vector4() },
            u_MainTex: { value: "Waveform-10201aa3-ebc2-42d8-84b7-2e63f6eeb8ab/Waveform-10201aa3-ebc2-42d8-84b7-2e63f6eeb8ab-v10.0-MainTex.png" },
            u_Cutoff: { value: 0.2 }
        },
        vertexShader: "Waveform-10201aa3-ebc2-42d8-84b7-2e63f6eeb8ab/Waveform-10201aa3-ebc2-42d8-84b7-2e63f6eeb8ab-v10.0-vertex.glsl",
        fragmentShader: "Waveform-10201aa3-ebc2-42d8-84b7-2e63f6eeb8ab/Waveform-10201aa3-ebc2-42d8-84b7-2e63f6eeb8ab-v10.0-fragment.glsl",
        side: 2,
        transparent: true,
        depthFunc: 2,
        depthWrite: false,
        depthTest: true,
        blending: 2,
        extensions: { derivatives: true }
    },
    "WetPaint" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0, 0, 0) },
            u_Shininess: { value: 0.1500 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_BumpMap_TexelSize: { value: new Vector4(0.0010, 0.0078, 1024, 128) },
            u_BumpMap: { value: "WetPaint-b67c0e81-ce6d-40a8-aeb0-ef036b081aa3/WetPaint-b67c0e81-ce6d-40a8-aeb0-ef036b081aa3-v10.0-BumpMap.png" },
            u_MainTex: { value: "WetPaint-b67c0e81-ce6d-40a8-aeb0-ef036b081aa3/WetPaint-b67c0e81-ce6d-40a8-aeb0-ef036b081aa3-v10.0-MainTex.png" },
            u_Cutoff: { value: 0.2 }
        },
        vertexShader: "WetPaint-b67c0e81-ce6d-40a8-aeb0-ef036b081aa3/WetPaint-b67c0e81-ce6d-40a8-aeb0-ef036b081aa3-v10.0-vertex.glsl",
        fragmentShader: "WetPaint-b67c0e81-ce6d-40a8-aeb0-ef036b081aa3/WetPaint-b67c0e81-ce6d-40a8-aeb0-ef036b081aa3-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0,
        extensions: { derivatives: true }
    },
    "WigglyGraphite" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [0.2931, 0.5524, -0.7803, 0, -0.8769, 0.4805, 0.0107, 0, 0.3809, 0.6811, 0.6253, 0, -4.9937, 8.1874, -46.2828, 1] },
            u_SceneLight_1_matrix: { value: [0.1816, -0.1369, -0.9738, 0, -0.7915, -0.6080, -0.0621, 0, -0.5835, 0.7821, -0.2188, 0, -5.6205, 8.2530, -46.8315, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0, 0, 0) },
            u_Shininess: { value: 0.1500 },
            u_time: { value: new Vector4() },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_MainTex: { value: "WigglyGraphite-5347acf0-a8e2-47b6-8346-30c70719d763/WigglyGraphite-5347acf0-a8e2-47b6-8346-30c70719d763-v10.0-MainTex.png" },
            u_Cutoff: { value: 0.2 }
        },
        vertexShader: "WigglyGraphite-5347acf0-a8e2-47b6-8346-30c70719d763/WigglyGraphite-5347acf0-a8e2-47b6-8346-30c70719d763-v10.0-vertex.glsl",
        fragmentShader: "WigglyGraphite-5347acf0-a8e2-47b6-8346-30c70719d763/WigglyGraphite-5347acf0-a8e2-47b6-8346-30c70719d763-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0,
        extensions: { derivatives: true }
    },
    "Wire" : {
        uniforms: {
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 }
        },
        vertexShader: "Wire-4391385a-cf83-4396-9e33-31e4e4930b27/Wire-4391385a-cf83-4396-9e33-31e4e4930b27-v10.0-vertex.glsl",
        fragmentShader: "Wire-4391385a-cf83-4396-9e33-31e4e4930b27/Wire-4391385a-cf83-4396-9e33-31e4e4930b27-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0,
    },
}