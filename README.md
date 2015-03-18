# ObjectControls

Object Controls are a lightweight attempt to make manipulating objects in three.js slightly easier. I'm open to suggestions, and would love to hear if / how you use it, so please hit me up on [Twitter] if you have any questions / concerns / comments / general hatred. 

*[View Project on Github]


Controlling objects in three.js is already very easy, and you can see some great examples of how to do it yourself by looking at some three.js examples:


* [Threejs Draggable Cubes]
* [ThreeJS BufferGeometry]


But if you want to not have to implement it yourself, these controls are a great place to start! To see what can be done with them, Check out some of the following projects:

* [cabbibo] - For intersection with all objects
* [Growing Boy] - For figuring out mouse position in 3D
* [Needs] - For selecting balls / songs
* [DRAGONFISH] - For determining where creature moves

There is also bunch more examples you can check out if you are more of a 'stare at the code' human being:

* [Drag] - A basic Drag and Drop example
* [Highlight] - The Most Basic example of highlighting different balls
* [HighlightGroup] - Highlight groups of balls
* [Displace] - Balls move away from your mouse when hit
* [Noises] - make noises when you hit the objects

But lets talk about how to actually use the code!

### Setup:

First off include the script:
```javascript
<script src="PATH/TO/ObjectControls.js"></script>
```

Do all the thing that you would normally do with threejs, like setting up the renderer, scene and camera. Once you have done all this you can initialize the controls:

```javascript
    objectControls = new ObjectControls( camera );
```

The 'camera' is passed into the ObjectControls , as the 'Eye' of the raycast. You could pass in a different 'eye' if you want, but it probably won't make too much sense...

Within your 'animate' loop, make sure that you update the objectcontrols, like so:

```javascript
    objectControls.update();
```

This is all you have to do to set up the Object Controls. But so far they don't do anything, so lets see how we can change that!

### How to use:

The object controls are used by adding meshes to them. All of the logic of what happens when the meshes are interacted with is added to the mesh, so it controls itself! Here's a basic example of how to add meshes to the object controls:

```javascript
    var mat = new THREE.MeshNormalMaterial();
    var geo = new THREE.IcosahedronGeometry( 10 , 1 );
    var mesh = new THREE.Mesh( geo , mat );
    objectControls.add( mesh );
    
    
    // This is what will be called when
    // the mesh gets hovered over ( intersected
    mesh.hoverOver = function(){
    
    }
    
    // This is what will get called when
    // the mesh gets hovered out ( unintersected )
    mesh.hoverOut = function(){
    
    }
    
    // This is what will be called if teh mesh
    // is both hovered, and the mousedown / touch happens
    mesh.select = function(){
    
    }
    
    // This is what will be called if the mesh
    // is selected and than becomes 'deselected' 
    // AKA the mouse gets released
    mesh.deselect = function(){

    }
    
    
    // This is what will be called
    // every frame on the mesh while it is
    // selected
    mesh.update = function(){

    }
    
    
```

In addition to controling a mesh as shown above, you can also control an Object3D with child meshes. Then events are triggered on the Object3D whenever any of its child meshes are intersected. To enable, set recursive:true in the params passed to the ObjectControls constructor, as shown in the [HighlightGroup] example.

As usual, although the code is stable, this is still a work in progress, so if you see any problems, please please please let me know! Also, if there is something you want to see implemented, have any other suggestions, or use the code for anything I'd love to see how you used it, so hit me up on [Twitter]


[Twitter]:http://twitter.com/cabbibo
[cabbibo]:http://cabbi.bo/
[Growing Boy]:http://cabbi.bo/growingBoy
[Needs]:http://cabbi.bo/Needs/
[DRAGONFISH]:http://cabbi.bo/DRAGONFISH

[Drag]: http://cabbi.bo/ObjectControls/examples/drag.html
[Highlight]: http://cabbi.bo/ObjectControls/examples/highlight.html
[HighlightGroup]: http://cabbi.bo/ObjectControls/examples/highlightGroup.html
[Displace]: http://cabbi.bo/ObjectControls/examples/displace.html
[Noises]: http://cabbi.bo/ObjectControls/examples/noises.html

[ThreeJS Draggable Cubes]: http://threejs.org/examples/#webgl_interactive_draggablecubes
[ThreeJS BufferGeometry]: http://threejs.org/examples/#webgl_interactive_buffergeometry
[View Project on Github]: http://github.com/cabbibo/ObjectControls
