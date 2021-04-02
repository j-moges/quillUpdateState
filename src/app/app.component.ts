import { Component, Input, Output, EventEmitter, PipeTransform, Pipe, OnInit, ChangeDetectionStrategy, HostListener, ChangeDetectorRef } from '@angular/core';
import Quill from 'quill';
const Parchment = Quill.import('parchment');
import { FormBuilder, FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { QuillEditorComponent } from 'ngx-quill';
import { isEqual } from 'lodash';


class IndentAttributor extends Parchment.Attributor.Style {
  constructor(attrName: string, keyName: string, options: any){
    super(attrName, keyName, options);
  }
  
  add (node, value) {
    value = parseInt(value);
    console.log('in Indent ADD');
    console.log(node);
    console.log(value);
    // if(value.toString().includes('em')){
    //   value = value.substr(0, value.indexOf('em'));
    // }
    // console.log('newvalue: ' + value);

    if (value === 0) {
      Parchment.Attributor.Style.remove(node)
      return true
    } else {
      return super.add(node, `${value}em`)
    }
  }
}

let IndentStyle = new IndentAttributor('indent', 'text-indent', {
  scope: Parchment.Scope.BLOCK,
  whitelist: ['1em', '2em', '3em', '4em', '5em', '6em', '7em', '8em', '9em']
})

export { IndentStyle }

var DirectionAttribute = Quill.import('attributors/attribute/direction');
var AlignClass = Quill.import('attributors/class/align');
var BackgroundClass = Quill.import('attributors/class/background');
var ColorClass = Quill.import('attributors/class/color');
var DirectionClass = Quill.import('attributors/class/direction');
var FontClass = Quill.import('attributors/class/font');
var SizeClass = Quill.import('attributors/class/size');
var AlignStyle = Quill.import('attributors/style/align');
var BackgroundStyle = Quill.import('attributors/style/background');
var ColorStyle = Quill.import('attributors/style/color');
var DirectionStyle = Quill.import('attributors/style/direction');
var FontStyle = Quill.import('attributors/style/font');
var SizeStyle = Quill.import('attributors/style/size');


Quill.register(DirectionAttribute,true);
Quill.register(AlignClass,true);
Quill.register(BackgroundClass,true);
Quill.register(ColorClass,true);
Quill.register(DirectionClass,true);
Quill.register(FontClass,true);
Quill.register(SizeClass,true);
Quill.register(AlignStyle,true);
Quill.register(BackgroundStyle,true);
Quill.register(ColorStyle,true);
Quill.register(DirectionStyle,true);
Quill.register(FontStyle,true);
Quill.register(SizeStyle,true);
Quill.register(IndentStyle, true);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {}
})
export class AppComponent implements OnInit {
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
  cursorPosition: any;

  @Input() getQuillContent: any;

  @Input()
  get quillContent(): any {
    console.log('getter');
    console.log(this.quillEditor.getSelection());
    return this.getQuillContent;
  }
  set quillContent(content: any) {
    console.log('setter');
    console.log(this.quillEditor?.getSelection());

    this.reactiveForm.setValue({
      quillBody: content || ''
    });
    // this.quillEditor.setSelection(this.cursorPosition);
  }

  @Output() updateQuillContent = new EventEmitter<{ bodyText: any }>();

  constructor(private fb: FormBuilder) {
    this.reactiveForm = fb.group({ quillBody: '' });
  }

  onQuillEditorCreated(editor) {
    editor.root.addEventListener("blur", () => {
      // console.log('++++++++++++++++++++++++++++++++++++++++++++');
      console.log('BLURRRRRRRRRRRRR');
      // console.log('++++++++++++++++++++++++++++++++++++++++++++');
      // console.log(this.reactiveForm.getRawValue());
      console.log(this.quillEditor.getSelection());

      // const formValues = this.reactiveForm.getRawValue();
      // if (!isEqual(formValues.quillBody, this.quillContent)){
      //   this.updateQuillContent.emit({ bodyText: formValues.quillBody });
      // }

    }
    );
    this.quillEditor = editor;
  }

  logContentChanged(editor) {
    console.log('onContentChanged');
    console.log(this.quillEditor.getSelection());
    // this.quillEditor.setSelection(this.cursorPosition);
    console.log(this.quillEditor.getSelection());

    // console.log(editor);
  }

  logSelection(quillSelection) {
    console.log('onSelectionChanged');
    // console.log(quillSelection);
    // this.cursorPosition = quillSelection.range;
  }

  onInsertText() {
    const selection = this.quillEditor.getSelection();
    this.quillEditor.insertText(selection.index, 'TEST');
  }

  updateState() {
    const formValues = this.reactiveForm.getRawValue();
    console.log(this.quillEditor.getSelection());
    
    // this.updateQuillContent.emit({ bodyText: formValues.quillBody });
  }

  resetContent(){
    const formValues = this.reactiveForm.getRawValue();
    this.updateQuillContent.emit({ bodyText: formValues.quillBody });
  }


  ngOnInit() { }
}
