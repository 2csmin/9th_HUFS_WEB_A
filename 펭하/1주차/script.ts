// 1. HTML 요소 선택
const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const todoForm = document.getElementById("todo-form") as HTMLFormElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;
const doneList = document.getElementById("done-list") as HTMLUListElement;

// 2. 타입
type Todo = { id: number; text: string };

let todos: Todo[] = [];
let doneTasks: Todo[] = [];

// 3. 렌더링
const renderTasks = (): void => {
  todoList.innerHTML = "";
  doneList.innerHTML = "";

  // 해야 할 일 → todoList
  todos.forEach((todo): void => {
    const li = createTodoElement(todo, false); // ✅ 반환 타입 맞추기
    todoList.appendChild(li); // ✅ 올바른 리스트에 붙이기
  });

  // 완료된 일 → doneList
  doneTasks.forEach((todo): void => {
    const li = createTodoElement(todo, true);
    doneList.appendChild(li);
  });
};

// 4. 입력값
const getTodoText = (): string => todoInput.value.trim();

// 5. 추가
const addTodo = (text: string): void => {
  todos.push({ id: Date.now(), text });
  todoInput.value = "";
  renderTasks();
};

// 6. 완료 이동
const completeTask = (todo: Todo): void => {
  todos = todos.filter((t) => t.id !== todo.id);
  doneTasks.push(todo);
  renderTasks();
};

// 7. 완료 목록 삭제 (이전 deleteTodo 대체)
const deleteDone = (todo: Todo): void => {
  doneTasks = doneTasks.filter((t) => t.id !== todo.id); // ✅ 완료목록에서 삭제
  renderTasks();
};

// 8. 아이템 생성
const createTodoElement = (todo: Todo, isDone: boolean): HTMLLIElement => { // ✅ 반환 타입
  const li = document.createElement("li");
  li.classList.add("render-container__item");

  const span = document.createElement("span");
  span.textContent = todo.text;

  const button = document.createElement("button");
  button.classList.add("render-container__item-button");

  if (isDone) {
    button.textContent = "삭제";
    button.style.background = "#dc3545";
    button.addEventListener("click", () => deleteDone(todo)); // ✅ 완료목록에서 삭제
  } else {
    button.textContent = "완료";
    button.style.backgroundColor = "#28a745";
    button.addEventListener("click", () => completeTask(todo)); // ✅ 이름/동작 일치
  }

  li.append(span, button);
  return li;
};

// 9. 폼 이벤트
todoForm.addEventListener("submit", (event: Event): void => {
  event.preventDefault();
  const text = getTodoText();
  if (text) addTodo(text);
});

renderTasks();
