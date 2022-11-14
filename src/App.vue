<template>
	<div class="sy-album">
		<div class="header" v-if="albumConfig.title.length > 0">
			<div class="title">{{ albumConfig.title }}</div>

			<div class="date">{{ joinDate(albumConfig.date) }}</div>
		</div>
		<div class="image-box">
			<img
				ref="imageDOM"
				:src="joinRoot([albumConfig.root, currentFile.file])"
				:alt="currentFile.caption"
			/>
		</div>
		<el-slider
			v-if="totalImages"
			v-model="index"
			:min="0"
			:max="totalImages - 1"
			:step="1"
			:format-tooltip="formatTooltip"
		/>
		<div class="func-btn">
			<el-button
				circle
				plain
				type="primary"
				:icon="Back"
				@click="prevImage"
				:disabled="index == 0"
			/>

			<el-button
				circle
				plain
				type="primary"
				:icon="albumIsPlay ? VideoPause : VideoPlay"
				@click="albumIsPlay = !albumIsPlay"
			/>

			<el-button
				circle
				plain
				type="primary"
				:icon="CopyDocument"
				@click="copyImage"
			/>

			<el-button
				circle
				plain
				type="primary"
				:icon="Comment"
				@click="showComment"
			/>

			<el-button
				circle
				plain
				type="primary"
				:icon="Right"
				@click="nextImage"
				:disabled="index == totalImages - 1"
			/>
		</div>

		<div class="comment-table" v-if="showCommentTable">
			<el-table :data="commentList" style="width: 100%;" border>
				<el-table-column
					label="位置"
					align="cneter"
					width="100"
					header-align="cneter"
				>
					<template #default="scope">
						<el-button
							link
							type="primary"
							@click="
								index = scope.row.index;
								showCommentTable = false;
							"
							style="display: flex; margin: auto;"
							>第 {{ scope.row.index + 1 }} 张</el-button
						>
					</template>
				</el-table-column>

				<el-table-column label="说明" header-align="cneter" align="cneter">
					<template #default="scope">
						<span v-html="scope.row.caption"></span>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<p
			class="image-caption"
			v-html="currentFile.caption || '暂无说明'"
			v-if="!showCommentTable"
		></p>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { getBaseId } from "./utils/query";
import { joinRoot, joinDate } from "./utils/path";
import { getBlockAttrs, defaultAlbumConfig, getAlbumConf } from "./utils/fetch";
import { ElMessage } from "element-plus";
//@ts-ignore
import {
	VideoPause,
	VideoPlay,
	Back,
	Right,
	CopyDocument,
	Comment,
} from "@element-plus/icons-vue";

const index = ref(0);
const showCommentTable = ref(false);
const commentList = computed(() =>
	albumConfig.value.images
		.map((e, index) => ({
			...e,
			index,
		}))
		.filter((e) => e.caption !== undefined && e.caption?.length > 0)
);
const id = getBaseId();
const imageDOM = ref((null as any) as HTMLImageElement);
const albumFile = ref("");
const albumIsPlay = ref(false);
const albumPlaySpeed = ref(2000);
const albumConfig = ref(defaultAlbumConfig());
const totalImages = computed(() => albumConfig.value?.images?.length ?? 0);
const currentFile = computed(() => {
	if (0 <= index.value && index.value < totalImages.value) {
		const image = albumConfig.value.images[index.value];

		if (image && !image.caption) {
			image.caption = "";
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

document.addEventListener("keyup", (e) => {
	if (e.ctrlKey && e.key === "ArrowRight") {
		nextImage();
	} else if (e.ctrlKey && e.key === "ArrowLeft") {
		prevImage();
	}
});

function nextImage() {
	showCommentTable.value = false;
	if (index.value < totalImages.value - 1) {
		index.value++;
	}
}

function prevImage() {
	showCommentTable.value = false;
	if (index.value > 0) {
		index.value--;
	}
}

function copyImage() {
	window.getSelection()!.removeAllRanges();
	const range = document.createRange();
	range.selectNode(imageDOM.value);
	window.getSelection()!.addRange(range);
	document.execCommand("Copy");
	window.getSelection()!.removeAllRanges();
	ElMessage.success(`成功复制第 ${index.value + 1} 张图片`);
}

function showComment() {
	showCommentTable.value = !showCommentTable.value;
}

window.setInterval(() => {
	if (!albumIsPlay.value) {
		return;
	}
	if (index.value < totalImages.value - 1) {
		index.value++;
	} else {
		index.value = 0;
	}
}, albumPlaySpeed.value);

(async () => {
	if (id.length > 1) {
		const { data } = await getBlockAttrs(id);
		const file = data["custom-album-file"];
		const speed = Number(data["custom-album-playspeed"]);

		if (speed >= 100) {
			albumPlaySpeed.value = speed;
		}

		if (file && file.endsWith(".json")) {
			albumFile.value = file;
			albumConfig.value = await getAlbumConf(albumFile.value);
		}
	}
})();
</script>

<style>
.sy-album {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.sy-album .header {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 100vw;
	padding-bottom: 5px;
}

.sy-album .header .title {
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

.sy-album .header .date {
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
.sy-album img {
	max-width: 100vw;
}

.sy-album .el-slider {
	width: 95%;
}

.sy-album .comment-table {
	width: 100%;
	margin: 20px 0px;
}

.sy-album .func-btn {
	width: 100%;
	display: flex;
	margin-top: 8px;
	margin-bottom: 20px;
	flex-direction: row;
	justify-content: space-around;
}

p.image-caption {
	font-size: 16px;
	font-weight: 300;
	color: grey;
	padding: 0;
	margin: 0;
}

.comment-table tr th div {
	text-align: center;
}

.comment-table a,
p.image-caption a {
	color: orange;
	text-decoration: none;
}

div.comment-table > div table tbody tr td.el-table__cell > div {
	text-align: center;
}
</style>
