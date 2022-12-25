//huynq2022
"use strict";

const camSettings = {
    video: {
        width: {
            min: 1280,
            ideal: 1280,
            max: 1920,
        },
        height: {
            min: 720,
            ideal: 720,
            max: 1080
        },
        facingMode: 'environment'
    }
};

const recordSettings = {
    audioBitsPerSecond: 0,
    videoBitsPerSecond: 2500000,
};

function CameraService(containerElement) {
    let permisson = false;
    const mediaStream = [];
    let recordChunks = undefined;
    let mediaRecorder = undefined;

    const mimeType = () => {
        const arr = ["video/mp4", "video/webm"];
        let result = "";
        for (let i = 0; i < arr.length; i++) {
            if (MediaRecorder.isTypeSupported(arr[i])) {
                result = arr[i];
                break;
            }
        }
        return result;
    };

    this.player = containerElement;
    this.requestPermisson = async (accessDenied = undefined) => {
        if (permisson) return permisson;

        this.player.oncanplay = () => {
            this.player.play();
        };
        //https only
        if (!('mediaDevices' in navigator && navigator.mediaDevices.getUserMedia)) {
            accessDenied?.();
            return permisson;
        }
        try {
            const requestStream = await navigator.mediaDevices.getUserMedia({ ...camSettings });
            requestStream.getTracks()[0].stop();
            permisson = true;
            return permisson
        }
        catch {
            accessDenied?.();
            return permisson;
        }
        return permisson;
    }
    this.getDevices = async (callback = undefined) => {
        if (!(await this.requestPermisson())) return;

        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput').reverse();
        
        callback?.(videoDevices);
    }

    this.startedStream = () => mediaStream.length > 0;

    this.startStream = async (options = camSettings, quality = recordSettings, callback = undefined) => {
        if (!(await this.requestPermisson())) return;
        if (this.startedStream()) return;

        const stream = await navigator.mediaDevices.getUserMedia({ ...camSettings, ...options });
        mediaStream.push(stream);

        //this.player.controls = false;
        //this.player.defaultMuted = true;
        //this.player.autoplay = false;

        this.player.srcObject = mediaStream[0];
        //this.player.play();

        recordChunks = [];
        const settings = { ...recordSettings, ...quality };
        settings.mimeType = mimeType();
        mediaRecorder = new MediaRecorder(mediaStream[0], settings);

        mediaRecorder.ondataavailable = (e) => {
            recordChunks.push(e.data);
        };
        mediaRecorder.onstart = () => {
            this.onRecordStarted?.(mediaRecorder);
        };
        //mediaRecorder.onpause = () => {
        //    // do something in response to
        //    // recording being paused
        //};

        //mediaRecorder.onresume = () => {
        //    // do something in response to
        //    // recording being resumed
        //};
        mediaRecorder.onstop = () => {
            this.onRecordStopped?.();

            const blob = new Blob(recordChunks, { type: mimeType() });
            recordChunks = [];

            this.onRecordFinished?.(blob);
        };

        callback?.(mediaRecorder);
    }
    this.startStreamDevice = async (deviceId = "", options = camSettings, quality = recordSettings, callback = undefined) => {
        if (deviceId == "" || deviceId === null || deviceId === undefined) {
            await this.startStream(options, quality, callback);
            return;
        }
        const setting = { ...camSettings, ...options };
        setting.video.deviceId = {
            exact: deviceId,
        };
        await this.startStream(setting, quality, callback);
    }

    this.closeStream = (callback = undefined) => {
        if (!this.startedStream()) return;

        this.player.play();
        mediaStream[0].getTracks()?.[0].stop();
        mediaStream.pop();

        recordChunks = undefined;
        mediaRecorder = undefined;

        callback?.();
    }

    this.play = (callback = undefined) => {
        if (!this.startedStream()) return;
        this.player.play();
        if (mediaRecorder.state === "paused") {
            mediaRecorder.resume();
        }
        callback?.();
    }
    this.pause = (callback = undefined) => {
        if (!this.startedStream()) return;
        this.player.pause();
        if (mediaRecorder.state === "recording") {
            mediaRecorder.pause();
        }
        callback?.();
    }

    this.startRecord = (callback = undefined) => {
        if (!this.startedStream()) return;
        if (mediaRecorder.state !== "inactive") return;
        mediaRecorder.start(1000);
        callback?.();
    }
    this.stopRecord = (callback = undefined) => {
        if (!this.startedStream()) return;
        if (mediaRecorder.state === "inactive") return;
        mediaRecorder.stop();
        callback?.();
    }
    this.onRecordFinished = undefined;
    this.onRecordStarted = undefined;
    this.onRecordStopped = undefined;
}