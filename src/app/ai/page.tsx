import CodeEditor from "@/components/editor";

export default function Demos() {
  return (
    <div className="flex-1 p-4">
      <CodeEditor
        value={`function sayHi() {\n  console.log("Hi!");\n}`}
        language="javascript"
      />
    </div>
  );
}
