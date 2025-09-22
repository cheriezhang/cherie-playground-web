"use client";
import {
  Suspense,
  use,
  useDeferredValue,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { flushSync } from "react-dom";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Loading, ServerLoading } from "@/components/loading";
import { useDebounce } from "@/lib/debounce";

function slowFilter(list: string[], query: string) {
  if (!query) return list;
  const start = performance.now();
  while (performance.now() - start < 100) {}
  return list.filter((item) => item.includes(query));
}
const list = Array.from({ length: 50000 }, (_, i) => `Item ${i}`);

const List = ({ list }: { list: string[] }) => {
  return (
    <div className="max-h-64 overflow-auto p-2 text-sm">
      {list.map((item) => (
        <div key={item}>{item}</div>
      ))}
    </div>
  );
};

function WithoutDeferred() {
  const [query, setQuery] = useState("");
  const filtered = slowFilter(list, query);

  return (
    <div>
      <div className="mb-2 font-semibold">Without useDeferredValue</div>
      <Input
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <p className="mb-2 text-sm text-gray-500">Query：{query}</p>
      <List list={filtered} />
    </div>
  );
}

function WithDeferred() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const filtered = slowFilter(list, deferredQuery);

  return (
    <div>
      <div className="mb-2 font-semibold">With useDeferredValue</div>
      <Input
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <p className="mb-2 text-sm text-gray-500">
        DeferredQuery: {deferredQuery}
      </p>
      <List list={filtered} />
    </div>
  );
}

export const UseDeferredValueDemo = () => {
  return (
    <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
      <WithDeferred />
      <WithoutDeferred />
    </div>
  );
};

function WithoutTransition() {
  const [query, setQuery] = useState("");
  const filtered = slowFilter(list, query);

  return (
    <div>
      <div className="mb-2 font-semibold">Without useTransition</div>
      <Input
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <p className="mb-2 text-sm text-gray-500">Query: {query}</p>
      <List list={filtered} />
    </div>
  );
}

function WithTransition() {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(list);
  const [isPending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newQuery = e.target.value;
    setQuery(newQuery); // 紧急更新：输入框立即更新

    // 非紧急更新：列表过滤延迟执行
    startTransition(() => {
      const newFiltered = slowFilter(list, newQuery);
      setFiltered(newFiltered);
    });
  }

  return (
    <div>
      <div className="mb-2 font-semibold">With useTransition</div>
      <Input placeholder="Search..." value={query} onChange={handleChange} />
      <p className="mb-2 text-sm text-gray-500">Query: {query}</p>
      {isPending ? <Loading /> : <List list={filtered} />}
    </div>
  );
}

export const StartTransactionDemo = () => {
  return (
    <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
      <WithoutTransition />
      <WithTransition />
    </div>
  );
};

const WithoutBatching = () => {
  const [count, setCount] = useState(0);
  const renderCount = useRef(0);
  renderCount.current += 1;

  <p>Render Count: {renderCount.current}</p>;
  const handleClick = () => {
    setCount((c) => c + 1);
    setCount((c) => c + 1);
    setCount((c) => c + 1);
  };

  const handleTimeout = () => {
    setTimeout(() => {
      flushSync(() => setCount((c) => c + 1));
      flushSync(() => setCount((c) => c + 1));
      flushSync(() => setCount((c) => c + 1));
    }, 0);
  };
  return (
    <div className="rounded">
      <div className="mb-2 font-semibold">Without Batching</div>
      <p>Count: {count}</p>
      <p>Render Count: {renderCount.current}</p>
      <Button kind="primary" className="mr-2 p-2" onClick={handleClick}>
        React Event Handler
      </Button>
      <Button kind="primary" className="p-2" onClick={handleTimeout}>
        setTimeout
      </Button>
    </div>
  );
};
const WithBatching = () => {
  const [count, setCount] = useState(0);
  const renderCount = useRef(0);
  renderCount.current += 1;

  const handleClick = () => {
    setCount((c) => c + 1);
    setCount((c) => c + 1);
    setCount((c) => c + 1);
  };

  const handleTimeout = () => {
    setTimeout(() => {
      // 在 setTimeout 里也会被自动批处理（React 18 之前不会）
      setCount((c) => c + 1);
      setCount((c) => c + 1);
      setCount((c) => c + 1);
    }, 0);
  };

  return (
    <div className="rounded">
      <div className="mb-2 font-semibold">With Batching</div>
      <p>Count: {count}</p>
      <p>Render Count: {renderCount.current}</p>
      <Button kind="primary" className="mr-2 p-2" onClick={handleClick}>
        React Event Handler
      </Button>
      <Button kind="primary" className="p-2" onClick={handleTimeout}>
        setTimeout
      </Button>
    </div>
  );
};

export const AutoBatchingDemo = () => {
  return (
    <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
      <WithoutBatching />
      <WithBatching />
    </div>
  );
};

const SlowAPIResponse = ({ promise }: { promise: Promise<any> }) => {
  const data = use(promise);
  return (
    <div className="rounded-2xl border border-primary p-2">
      <p>Message: {data.message}</p>
      <p>Timestamp: {new Date(data.timestamp).toLocaleTimeString()}</p>
    </div>
  );
};

export const SuspenseWithTransition = () => {
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState("");
  const request = (query: string) =>
    fetch(`/api/demo?query=${query}`).then((res) => res.json());
  const promise = useMemo(() => request(query), [query]);

  const debouncedSetQuery = useDebounce((newQuery: string) => {
    setQuery(newQuery);
  }, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setInputValue(newQuery);
    debouncedSetQuery(newQuery);
  };

  return (
    <div>
      <div className="mb-2 font-semibold">Suspense with Slow response</div>
      <Input
        placeholder="Search..."
        value={inputValue}
        onChange={handleChange}
      />
      <p className="mb-2 text-sm text-gray-500">Query: {query}</p>
      <Suspense fallback={<ServerLoading />}>
        <SlowAPIResponse promise={promise} />
      </Suspense>
    </div>
  );
};
