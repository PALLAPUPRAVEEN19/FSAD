import React from 'react';
import { motion } from 'motion/react';
import { Star, MapPin, Shield, MessageSquare, Video } from 'lucide-react';
import Button from '../common/Button';
import StatusBadge from '../common/StatusBadge';
import { formatCurrency } from '../../utils/formatCurrency';
import { toast } from 'sonner';
import './ProfessionalCard.css';

const ProfessionalCard = ({ professional }) => {
  const {
    name,
    role,
    avatar,
    rating,
    reviews,
    hourlyRate,
    skills,
    verified,
    category
  } = professional;

  const handleBook = () => {
    toast.success('Booking Request Sent!', {
      description: `${name} will respond within 24 hours`
    });
  };

  const handleMessage = () => {
    toast.info('Opening chat...');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="pro-card"
    >
      <div className="pro-card-header">
        <div className="pro-card-avatar-wrapper">
          <img src={avatar} alt={name} className="pro-card-avatar" />
          {verified && (
            <div className="pro-card-verified">
              <Shield size={16} />
            </div>
          )}
          <div className="pro-card-status" />
        </div>

        <div className="pro-card-info">
          <h3 className="pro-card-name">{name}</h3>
          <p className="pro-card-role">{role}</p>
          <div className="pro-card-badges">
            <StatusBadge variant="info" size="sm">{category}</StatusBadge>
            <div className="pro-card-rating">
              <Star size={14} className="pro-card-star" />
              <span>{rating}</span>
              <span className="pro-card-reviews">({reviews})</span>
            </div>
          </div>
        </div>

        <div className="pro-card-rate">
          <span className="pro-card-rate-amount">{formatCurrency(hourlyRate)}</span>
          <span className="pro-card-rate-period">/hour</span>
        </div>
      </div>

      <div className="pro-card-skills">
        {skills.map((skill, index) => (
          <span key={index} className="pro-card-skill">
            {skill}
          </span>
        ))}
      </div>

      <div className="pro-card-footer">
        <Button
          variant="outline"
          size="sm"
          icon={<MessageSquare size={16} />}
          onClick={handleMessage}
        >
          Message
        </Button>
        <Button
          variant="primary"
          size="sm"
          icon={<Video size={16} />}
          onClick={handleBook}
        >
          Book Consultation
        </Button>
      </div>
    </motion.div>
  );
};

export default ProfessionalCard;
