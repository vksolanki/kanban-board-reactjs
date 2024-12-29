import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addTag, removeTag, loadTags } from '../features/kanban/kanbanboardSlice';
import { Tag } from '../models/tag';

const TagsManager: React.FC = () => {
    const tags = useSelector((state: RootState) => state.board.tags);
    const dispatch = useDispatch();
    const [tagName, setTagName] = useState('');
    const [tagColor, setTagColor] = useState('#6b6b6b');
    const [error, setError] = useState('');

    useEffect(() => {
        dispatch(loadTags() as any);
    }, [dispatch]);

    const handleAddTag = () => {
        if (tagName.trim() === '') {
            setError('Tag name cannot be empty');
            return;
        }
        if (tagName.length > 16) {
            setError('Tag name cannot exceed 16 characters');
            return;
        }
        if (tags.some(tag => tag.name === tagName)) {
            setError('Tag name already exists');
            return;
        }

        if(tagColor.trim() === '') {
            setTagColor('#6b6b6b');
        }
        const newTag: Tag = { name: tagName, color: tagColor };
        dispatch(addTag(newTag));
        setTagName('');
        setTagColor('#000000');
        setError('');
    };

    const handleRemoveTag = (name: string) => {
        dispatch(removeTag(name));
    };

    return (
        <div className="tags-manager">
            <h2>Manage Tags</h2>
            <div className="tag-inputs">
                <input
                    type="text"
                    placeholder="Tag Name"
                    value={tagName}
                    onChange={(e) => setTagName(e.target.value)}
                />
                <input
                    type="color"
                    value={tagColor}
                    onChange={(e) => setTagColor(e.target.value)}
                />
                <button onClick={handleAddTag}>Add Tag</button>
            </div>
            {error && <p className="error">{error}</p>}
            <ul className="tags-list">
                {tags.map((tag) => (
                    <li key={tag.name} className="tag-item">
                        <span className="tag" style={{ backgroundColor: tag.color }}>{tag.name}</span>
                        <button className="delete-btn" onClick={() => handleRemoveTag(tag.name)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TagsManager;
