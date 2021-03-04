import { Component, Input, Output, EventEmitter, PipeTransform, Pipe, OnInit, ChangeDetectionStrategy, HostListener, ChangeDetectorRef } from '@angular/core';
import Quill from 'quill';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { QuillEditorComponent } from 'ngx-quill';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {}
})
export class AppComponent {
  title = 'quill-update-state';

  quillPlaceholder = 'Enter Body...';
  quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      //We probably don't need two font fields.  Remove the header to keep confusion down [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'],                                         // remove formatting button
      ['link', 'image', 'video']                         // link and image, video
    ]
  };
  quillStyles = { height: '500px' };

  quillEditor: any;

  reactiveForm: FormGroup;

  @Input() getQuillContent: any;

  @Input()
  get quillContent(): any {
    return this.getQuillContent;
  }
  set quillContent(content: any){
    this.reactiveForm.setValue({
      quillBody: content || ''
    });
  }

  // @Output() setQuillContent = new EventEmitter<{bodyText: any}>();

  @Output() updateQuillContent = new EventEmitter<{bodyText: any}>();

  constructor(private fb: FormBuilder){
    this.reactiveForm = fb.group({ quillBody: '' });
  }

  onQuillEditorCreated(editor) {
    editor.root.addEventListener("blur", () => {
    console.log('++++++++++++++++++++++++++++++++++++++++++++');
      console.log('BLURRRRRRRRRRRRR');
      console.log('++++++++++++++++++++++++++++++++++++++++++++');
      console.log(this.reactiveForm.getRawValue());
      //save the cursor position before we lose it when leaving the editor
      // this.bodyCursorPosition = this.quillEditor.getSelection();
      this.updateQuillContent.emit({bodyText: this.reactiveForm.getRawValue()});

    }
    );
    this.quillEditor = editor;
  }

  logContentChanged(editor){
    console.log(editor);
  }

  logSelection(quillSelection){
    console.log(quillSelection);
  }

  onInsertText(){
    const selection = this.quillEditor.getSelection();
    this.quillEditor.insertText(selection?.index ? selection.index : 0, 'Test');
  }

  updateState(){
    this.updateQuillContent.emit({bodyText: this.reactiveForm.getRawValue()});
  }

}
