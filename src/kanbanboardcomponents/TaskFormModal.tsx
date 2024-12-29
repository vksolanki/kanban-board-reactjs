import React, { useState, useEffect } from 'react';
import { Task } from '../models/task';
import { Status } from '../models/status';
import { Tag } from '../models/tag';
import './TaskFormModal.css';
import ReusableModal from '../components/ReusableModal';

interface TaskFormModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSave: (task: Task) => void;
  task?: Task | null;
  statuses: Status[];
  tags: Tag[];
}

const TaskFormModal: React.FC<TaskFormModalProps> = ({ isOpen, onRequestClose, onSave, task, statuses, tags }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [status, setStatus] = useState(task?.status || statuses[0].status);
  const [selectedTags, setSelectedTags] = useState<string[]>(task?.tags ? task.tags: []);
  console.log("selectedTags", selectedTags);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setStatus(task.status);
      setSelectedTags(task.tags ? task.tags : []);
      console.log("seltags.....", task.tags ? task.tags.map(tag => tag) : []);
    } else {
      setTitle('');
      setStatus(statuses[0].status);
      setSelectedTags([]);
    }
  }, [task, statuses]);

  const handleSave = () => {
    if (title.trim()) {
      const uniqueTags = Array.from(new Set(selectedTags))
        .map(name => tags.find(tag => tag.name === name)!).map(tag => tag.name);
      const newTask: Task = {
        id: task ? task.id : Date.now(),
        title,
        status,
        sortIndex: task ? task.sortIndex : 0,
        tags: uniqueTags,
      };
      onSave(newTask);
      setTitle('');
      setStatus(statuses[0].status);
      setSelectedTags([]);
      onRequestClose();
    }
  };

  const handleTagChange = (tag: Tag) => {
    if (selectedTags.includes(tag.name)) {
      setSelectedTags(selectedTags.filter(t => t !== tag.name));
    } else if (selectedTags.length < 3) {
      setSelectedTags([...selectedTags, tag.name]);
    }
  };

  const handleClose = () => {
    setTitle('');
    setStatus(statuses[0].status);
    setSelectedTags([]);
    onRequestClose();
  };

  return (
    <ReusableModal isOpen={isOpen} onRequestClose={handleClose} contentLabel="Task Form">
      <div className="task-form">
        <h2>{task ? 'Edit Task' : 'New Task'}</h2>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
          />
        </label>
        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            {statuses.map((status) => (
              <option key={status.status} value={status.status}>
                {status.title}
              </option>
            ))}
          </select>
        </label>
        <label>
          Tags:
          <div className="tags-container">
            {tags.map(tag => (
              <div key={tag.name} style={{ backgroundColor: tag.color }} className={`tag ${selectedTags.includes(tag.name) ? 'selected' : ''}`} onClick={() => handleTagChange(tag)}>
                <span>{tag.name}</span>
              </div>
            ))}
          </div>
        </label>
        <div className="task-form-buttons">
          <button className="save-btn" onClick={handleSave}>Save</button>
          <button className="cancel-btn" onClick={handleClose}>Cancel</button>
        </div>
      </div>
    </ReusableModal>
  );
};

export default TaskFormModal;
