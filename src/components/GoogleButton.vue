<template>
    <div class="google-btn">
        <div class="google-icon-wrapper">
        <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
        </div>
        <p class="btn-text"><b>{{msg}} with google</b></p>
    </div>
</template>

<script>
    export default {
        name: 'GoogleButton',
		props: ['msg'],
    }
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:500);
 .google-btn {
	 width: 184px;
	 height: 42px;
	 background-color: #4285f4;
	 border-radius: 2px;
	 box-shadow: 0 3px 4px 0 rgba(0, 0, 0, .25);
}
 .google-btn .google-icon-wrapper {
	 position: absolute;
	 margin-top: 1px;
	 margin-left: 1px;
	 width: 40px;
	 height: 40px;
	 border-radius: 2px;
	 background-color: #fff;
     display: flex;
    align-items: center;
    justify-content: center;
}
 .google-btn .google-icon {
	 position: absolute;
     /*
	 margin-top: 11px;
	 width: 18px;
	 height: 18px;
     */
}
 .google-btn .btn-text {
	 float: right;
	 margin: 11px 11px 0 0;
	 color: #fff;
	 font-size: 14px;
	 letter-spacing: 0.2px;
	 font-family: "Roboto";
}
 .google-btn:hover {
	 box-shadow: 0 0 6px #4285f4;
}
 .google-btn:active {
	 background: #1669f2;
 }
</style>