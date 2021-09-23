import json
import spacy


def search_particles(verbs):
    nlp = spacy.load("ja_core_news_sm")
    for verb in verbs:
        for example in verb['examples']:
            doc = nlp(example['ja'])
            example['indexes'] = []
            for token in doc:
                if token.pos_ != 'ADP':
                    continue
                if token.text not in ['は', 'が', 'を', 'に']:
                    continue
                if token.dep_ not in ['case', 'fixed', 'advcl']:
                    continue
                example['indexes'].append(token.idx)
        verb['examples'] = [example for example in verb['examples']
                            if len(example['indexes']) > 0]


verbs = json.load(open('../src/verbs.json', 'r'))
search_particles(verbs)
json.dump(verbs, open('../src/verbs.json', 'w'))
