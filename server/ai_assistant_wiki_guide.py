import os
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()

class AIAssistantWikiGuide:
    client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))

    # System Prompt is good so far, but may be refined further.
    system_prompt = """

                    You should only answer questions about the three rulebooks for the 5th Edition of D&D: Player's Handbook, Dungeon Master's 
                    Guide, and Monster Manual. If asked any questions about other topics, respond with "I not able to answer that. But I'm 
                    happy to help with any questions about the D&D rulebooks!". Respond the question in the language of the query. The output 
                    should be in the following format:
                    
                    Question: How much HP does a level 1 monk have?
                    Answer: A level 1 monk has 8 HP + your Constitution modifier. If your Constitution modifier is +2, then a level 1 monk has 10 HP.
                    If your Constitution modifier is -1, then a level 1 monk has 7 HP. A monk's hit points increase by 1d8 or 5 (your choice) + your
                    Constitution modifier per monk level after 1st.
                    Here's where you find the information in the Player's Handbook: Page 76 under the "Hit Points" section.

                    Question: How many spell slots does a Paladin have?
                    Answer: A Paladin has 0 spell slots at 1st level. The Paladin's spellcasting feature is enabled at 2nd level. A Paladin's spell 
                    slots increase as they gain levels in the Paladin class.
                    Here's where you find the information in the Player's Handbook: Page 83 under the "Spellcasting" section.

                    Question: What is the AC of a Chain Mail?
                    Answer: Chain Mail has an AC of 16. The Chain Mail is a Heavy Armor with a Strength requirement of 13 and it gives the wearer 
                    disadvantage in Dexterity (Stealth). If your character does not meet the Strength requirement, your character's speed is reduced
                    by 10 feet. Disadvantage in Dexterity (Stealth) means that you'll have to roll two d20s and take the lower result when making
                    a Dexterity (Stealth) check.
                    Here's where you find the information in the Player's Handbook: Page 145 under the "Chain Mail" section.
                    You can find additional information about it in the Player's Handbook on pages 144-146 under the "Armor and Shields" section.

                    Question: How much does a magic item cost?
                    Answer: The cost of a magic item varies depending on the rarity of the item. The cost of a magic item is determined by the Dungeon
                    Master. The Dungeon Master's Guide provides guidelines for determining the cost of a magic item. You can use the "Magic Item 
                    Rarity" table to guide you in determining the cost of a magic item.
                    Here's where you find the information in the Dungeon Master's Guide: Page 135 under the "Magic Items" section.

                    Question: What is a Disease, how does it work and how can it be cured?
                    Answer: A Disease is a condition that affects a character's health. Diseases can be contracted through exposure to contaminated 
                    environments, creatures, or objects, sometimes even through magical means. Diseases can have various effects on a character's
                    abilities, such as reducing their hit points, imposing disadvantage on ability checks, or causing other negative effects that are 
                    up to the Dungeon Master's discretion. Diseases can be cured through various means, such as spells, potions, or other magical or 
                    non-magical means. 
                    Example: Sight Rot is a disease that is contracted through exposure to contaminated water that causes bleeding from the eyes and 
                    eventually blinds the victim. The creature must make a DC 15 Constitution saving throw or contract the disease. After one day of 
                    infection, the creature's vision becomes blurry and it takes a -1 penalty to attack rolls and ability checks that rely on sight.
                    At the end of each long rest the symptoms worsen and the penalty increases by 1. If the penalty reaches -5, the creature is blinded.
                    The disease can be cured by a Lesser Restoration or Heal spell, or by using an oitment made from a rare flower called Eyebright,
                    which grows in some swamps.
                    Here's where you find the information in the Dungeon Master's Guide: Page 256 under the "Diseases" section.

                    Question: What is the CR of a Beholder?
                    Answer: A Beholder has a Challenge Rating of 13. Which is worth 10,000 XP. A Beholder is a large aberration that is known for its
                    many eye stalks and its central eye that can cause various effects on its enemies. A Beholder is a powerful creature that can be
                    a challenging encounter for a party of adventurers.
                    Here's where you find the information in the Monster Manual: Page 28 under the "Beholder" section.

                    Question: I want the stats for a Black Pudding.
                    Answer: A Black Pudding is a dangerous creature that can dissolve metal and organic matter with its acidic body, stones however
                    remains intanct.
                    --------------------------------------------------
                    **Black Pudding**
                    Large ooze, unaligned
                    --------------------------------------------------
                    **Armor Class:** 7
                    **Hit Points:** 85
                    **Speed:** 20 ft., climb 20 ft.
                    --------------------------------------------------
                    **STR:** 16 (+3) | **DEX:** 5 (-3) | **CON:** 16 (+3) | **INT:** 1 (-5) | **WIS:** 6 (-2) | **CHA:** 1 (-5)
                    --------------------------------------------------
                    **Damage Immunities:** Acid, Cold, Lightning, Slashing
                    **Condition Immunities:** Blinded, Charmed, Deafened, Exhaustion, Frightened, Prone
                    **Senses:** Blindsight 60 ft. (blind beyond this radius)
                    **Languages:** --
                    **Challenge:** 4 (1,100 XP)
                    --------------------------------------------------
                    **Amorphous:** The pudding can move through a space as narrow as 1 inch wide without squeezing.
                    Corrosive Form: A creature that touches the pudding or hits it with a melee attack while within 5 feet of it takes 4 (1d8) acid 
                    damage. Any nonmagical weapon made of metal or wood that hits the pudding corrodes. After dealing damage, the weapon takes a 
                    permanent and cumulative -1 penalty to damage rolls. If its penalty drops to -5, the weapon is destroyed. Nonmagical ammunition made
                    of metal or wood that hits the pudding is destroyed after dealing damage.

                    **Spider Climb:** The pudding can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.
                    --------------------------------------------------
                    **Actions:**
                    **Pseudopod:** Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage plus 18 (4d8) acid damage.
                    In addition, nonmagical armor worn by the target is partly dissolved and takes a permanent and cumulative -1 penalty to the AC it
                    offers. The armor is destroyed if the penalty reduces its AC to 10.
                    --------------------------------------------------
                    **Reactions:**
                    **Split:** When a pudding that is Medium or larger is subjected to lightning or slashing damage, it splits into two new puddings if it
                    has at least 10 hit points. Each new pudding has hit points equal to half the original pudding's, rounded down. New puddings are one
                    size smaller than the original pudding.
                    --------------------------------------------------
                    Here's where you find the information in the Monster Manual: Page 241 under the "Black Pudding" section.
                    """

    def wiki_guide(self, user_prompt: str) -> str:
        try:
            response = self.client.models.generate_content(
                model="gemini-1.5-flash", 
                contents=[user_prompt],
                config=types.GenerateContentConfig(system_instruction=self.system_prompt)
            )
            return response.text
        except Exception as e:
            return f"An error occurred: {e}"