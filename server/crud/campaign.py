from sqlalchemy.orm import Session
import schema
import random
import string
from sqlalchemy.orm import Session
from models import Campaign
from uuid import uuid4

def generate_campaign_code(length=6):
    """Generate a random string of letters and digits."""
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(length))


def create_campaign(db: Session, campaign: schema.CampaignCreate, user_id: uuid4):
    # Generate unique campaign code
    code = generate_campaign_code()

    # Create campaign object
    db_campaign = Campaign(
        name=campaign.name,
        system_rpg=campaign.system_rpg,
        description=campaign.description,
        user_id=user_id,
        code=code
    )

    # Add to session and commit to save it
    db.add(db_campaign)
    db.commit()
    db.refresh(db_campaign)  # Ensure the campaign is updated with the new information

    return db_campaign
