import { useState, useRef } from "react";

export default function MusicUploader({ onUpload }) {
const [selected, setSelected] = useState(null);
const [isRecording, setIsRecording] = useState(false);
const mediaRecorder = useRef(null);
const chunks = useRef([]);

function handleFile(e) {
const file = e.target.files[0];
if (file && onUpload) {
onUpload({ file, url: URL.createObjectURL(file), type: "upload" });
setSelected(file.name);
}
}

async function startRecording() {
const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
mediaRecorder.current = new window.MediaRecorder(stream);
mediaRecorder.current.ondataavailable = (e) => chunks.current.push(e.data);
mediaRecorder.current.onstop = () => {
const blob = new Blob(chunks.current, { type: "audio/webm" });
chunks.current = [];
if (onUpload) {
onUpload({
file: blob,
url: URL.createObjectURL(blob),
type: "recording",
});
setSelected("Live Recording");
}
};
chunks.current = [];
mediaRecorder.current.start();
setIsRecording(true);
}

function stopRecording() {
mediaRecorder.current && mediaRecorder.current.stop();
setIsRecording(false);
}

return (
<div className="mb-3 flex flex-col gap-2">
<label className="text-cyan-300 font-mono">Add Track / Record</label>
<input type="file" accept="audio/*" onChange={handleFile} className="mb-1" />
{!isRecording ? (
<button className="btn" onClick={startRecording}>
🎤 Start Recording
</button>
) : (
<button className="btn bg-red-600 hover:bg-red-700" onClick={stopRecording}>
⏹️ Stop Recording
</button>
)}
{selected && <div className="text-cyan-200 text-xs mt-1">Loaded: {selected}</div>}
</div>
);
}
