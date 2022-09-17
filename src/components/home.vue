<template>
	<div class="image-list">
		<div class="header">
			<div class="title">{{ albumConfig.title }}</div>

			<div class="date">{{ joinDate(albumConfig.date) }}</div>
		</div>
		<img
			:src="joinRoot([albumConfig.root, currentFile.file])"
			:alt="currentFile.caption"
		/>
		<el-slider
			v-if="totalImages"
			v-model="index"
			:min="0"
			:max="totalImages - 1"
			:step="1"
			:format-tooltip="formatTooltip"
		/>
		<p class="image-caption" v-html="currentFile.caption"></p>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useSyParams } from "../utils/query";
import { joinRoot, joinDate } from "../utils/path";
import {
	getBlockAttrs,
	defaultAlbumConfig,
	getAlbumConf,
} from "../utils/fetch";

const index = ref(0);
const albumFile = ref("");
const params = useSyParams();
const albumConfig = ref(defaultAlbumConfig());
const totalImages = computed(() => albumConfig.value?.images?.length ?? 0);

const currentFile = computed(() => {
	if (0 <= index.value && index.value < totalImages.value) {
		const image = albumConfig.value.images[index.value];

		if (image && !image.caption) {
			image.caption = "暂无说明";
		}
		return image;
	} else {
		return {
			file: "",
			caption: "",
		};
	}
});

const formatTooltip = (val: number) => {
	return "第 " + (val + 1) + " 张照片";
};

(async () => {
	const { data } = await getBlockAttrs(params.id);
	const file = data["custom-album-file"];
	if (file && file.endsWith(".json")) {
		albumFile.value = file;
	}

	albumConfig.value = await getAlbumConf(albumFile.value);
})();
</script>

<style>
.image-list {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.image-list .header {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 100vw;
	padding-bottom: 5px;
	border-bottom: solid 1px grey;
	margin-bottom: 15px;
}

.image-list .header .title {
	font-size: 20px;
	font-weight: 300;
	color: grey;
	padding: 0;
	margin: 0;
	display: flex;
	width: 50vw;
	justify-content: center;

	align-items: center;
}

.image-list .header .date {
	font-size: 20px;
	font-weight: 300;
	color: grey;
	padding: 0;
	margin: 0;
	display: flex;
	width: 50vw;
	justify-content: center;

	align-items: center;
}
.image-list img {
	max-height: 80vh;
}

.image-list .el-slider {
	width: 60%;
}
p.image-caption {
	font-size: 16px;
	font-weight: 300;
	color: grey;
	padding: 0;
	margin: 0;
}
</style>
