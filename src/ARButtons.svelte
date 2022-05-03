<script lang="ts">
    import {XRService} from "./services/XR-service";
    import {DeviceIdentifierHelper} from "./services/device-identifier-helper";

    const deviceIdentifier = new DeviceIdentifierHelper();
    const xrService = new XRService();
    let isDeviceIOS = deviceIdentifier.isIOS()
    let isDeviceMobile = deviceIdentifier.isMobile();
    export let scene;
    let enterAR = () => {
        xrService.enterXRSession(scene);
    }
</script>

{#if (isDeviceMobile)}
    <div class="ar_buttons">
            <div on:click|preventDefault={enterAR} class="ar_btn">
                <img src="./assets/view.png" width="48px" alt="ar">
            </div>
    </div>
{/if}
<!--<a rel="ar" class="ar_btn" id="ar-link-3" href="https://developer.apple.com/augmented-reality/quick-look/models/solar-panels/solar_panels_stylized.usdz#custom=https://developer.apple.com/augmented-reality/quick-look/models/solar-panels/solar_panels_custom.html?1&customHeight=large&allowsContentScaling=0">
    <img src="./assets/view.png" width="48px" alt="ar">
</a>-->
