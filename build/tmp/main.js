import { getDocument } from "pdfjs-dist";
import { EventBus } from "pdfjs-dist/web/pdf_viewer.component";
class MainTest {
    file;
    eventBus;
    task;
    constructor(file) {
        this.file = file;
        this.eventBus = new EventBus();
    }
    loadPdf() {
        this.task = getDocument("file://" + this.file);
        return this.task.promise;
    }
}
// This is actually never called, as the test only consists in compiling the file.
// The compilation will crawl through all files and make sure that the types are consistent.
const mt = new MainTest("../pdfs/basicapi.pdf");
mt.loadPdf().then(() => {
    console.log("loaded");
});
//# sourceMappingURL=main.js.map