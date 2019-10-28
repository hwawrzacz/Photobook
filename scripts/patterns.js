const textBoxPattern = `
        <div class="textbox-container">
            <input type="text" />

            <ul class="textbox-tools size-fill-parent">
                <li><i class="material-icons">format_align_left</i></li>
                <li><i class="material-icons">format_align_justify</i></li>
                <li><i class="material-icons">format_align_right</i></li>
                <li><i class="material-icons">text_rotation_angleup</i></li>
                <li><i class="material-icons">text_rotation_angledown</i></li>
                <li><input type="color" /></li>
            </ul>
            
            <div class="hooks-container">
                <i class="hook hook-delete material-icons">close</i>
                <i class="hook hook-rotate material-icons">rotate_left</i>
            </div>
        </div>`;

const imagePattern = `
    <div class="image-container flex-container flex-v-h-center">
        <button class="circle-button material-icons">add</button>
        <button onClick="getData()">Get data</button>

        <div class="hooks-container">
            <i class="hook hook-delete material-icons">close</i>
            <i class="hook hook-resize material-icons">code</i>
            <i class="hook hook-rotate material-icons">rotate_left</i>
        </div>
    </div>`;
