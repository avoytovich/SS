#!/usr/bin/env bash

>&2 git fetch --tags

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"

BRANCH=$(echo "${1:-$(git branch | grep '*' | cut -d ' ' -f 2)}" | sed -e 's/origin\///')
HEAD=${2:-$BRANCH}

CURRENT_YEAR=$(expr $(date "+%Y") - 2000)

>&2 echo "On branch: $BRANCH"

CURRENT_TAG=$(git tag --points-at "$HEAD" | head -n 1)
if [[ ! -z "$CURRENT_TAG" ]]; then
	>&2 echo "On tag: $CURRENT_TAG"

	echo "$CURRENT_TAG"
	exit
fi

if [[ "$BRANCH" == 'master' ]]; then
	RELEASES=$(git branch -r | grep 'origin/release/' | sort -Vr | sed -e 's/ //g')
	while read -r LAST_RELEASE; do
		if [[ ! -z $(git merge-base "$LAST_RELEASE" "$HEAD") ]]; then
			break
		fi
	done <<< "$RELEASES"
	>&2 echo "Last release branch was: $LAST_RELEASE"
	COMMITS_SINCE_LAST_RELEASE=$(git rev-list --count --left-right "$LAST_RELEASE...$HEAD" | cut -f 2)

	RELEASE_YEAR=$(echo "$LAST_RELEASE" | cut -d '/' -f 3 | cut -d '.' -f 1)
	if [[ "$RELEASE_YEAR" == "$CURRENT_YEAR" ]]; then
		NEXT_MINOR_VERSION=$(echo "$LAST_RELEASE" | cut -d '/' -f 3 | cut -d '.' -f 2)

		echo "$RELEASE_YEAR.$(expr "$NEXT_MINOR_VERSION" + 1).0.alpha-$COMMITS_SINCE_LAST_RELEASE"
	else
		echo "$CURRENT_YEAR.0.0.alpha-$COMMITS_SINCE_LAST_RELEASE"
	fi

	exit

fi

# Note: these next two clauses were when we had both release-beta and release
# branches, and are currently disabled. The third clause (the first uncommented
# one has been added for the current scenario when we only have release branches
# if [[ "$BRANCH" == "release-beta/"* ]]; then
# 	MAJORMINOR=$(echo "$BRANCH" | cut -d '/' -f 2)
# 	if [[ ! -z $(git branch -r | grep "release/$MAJORMINOR") ]]; then
# 		>&2 echo "You cannot build beta versions of a release after a release branch has been created."

# 		exit 1
# 	fi

# 	# Note: stolen from https://stackoverflow.com/questions/1527234/finding-a-branch-point-with-git
# 	# The original version I had using merge-base broke when the release branch was merged to master
# 	COMMON_ANCESTOR=$(diff --old-line-format='' --new-line-format='' <(git rev-list --first-parent origin/master) <(git rev-list --first-parent "$HEAD") | head -1)
# 	COMMITS_SINCE_ANCESTOR=$(git rev-list --count --left-right "$COMMON_ANCESTOR...$HEAD" | cut -f 2)
# 	BETA_NUMBER=$(expr "$COMMITS_SINCE_ANCESTOR" + 1)

# 	echo "$MAJORMINOR.0.beta-$BETA_NUMBER"

# 	exit
# fi

# if [[ "$BRANCH" == "release/"* ]]; then
# 	MAJORMINOR=$(echo "$BRANCH" | cut -d '/' -f 2)
# 	LAST_RELEASE_TAG=$(git tag | grep "^$MAJORMINOR." | sort -Vr | head -n 1)
# 	if [[ -z "$LAST_RELEASE_TAG" ]]; then
# 		NEXT_PATCH_VERSION=0
# 		RC_NUMBER=$(expr "$(git rev-list --count --left-right "$(git merge-base "$HEAD" "origin/release-beta/$MAJORMINOR")...$HEAD" | cut -f 2)" + 1)
# 	else
# 		NEXT_PATCH_VERSION=$(expr "$(echo "$LAST_RELEASE_TAG" | cut -d '.' -f 3)" + 1)
# 		RC_NUMBER=$(git rev-list --count --left-right "$LAST_RELEASE_TAG...$HEAD" | cut -f 2)
# 	fi

# 	echo "$MAJORMINOR.$NEXT_PATCH_VERSION.rc-$RC_NUMBER"

# 	exit
# fi

if [[ "$BRANCH" == "release/"* ]]; then
	MAJORMINOR=$(echo "$BRANCH" | cut -d '/' -f 2)
	LAST_RELEASE_TAG=$(git tag | grep "^$MAJORMINOR." | sort -Vr | head -n 1)
	if [[ -z "$LAST_RELEASE_TAG" ]]; then
		NEXT_PATCH_VERSION=0
		# Note: stolen from https://stackoverflow.com/questions/1527234/finding-a-branch-point-with-git
		# The original version I had using merge-base broke when the release branch was merged to master
		COMMON_ANCESTOR=$(diff --old-line-format='' --new-line-format='' <(git rev-list --first-parent origin/master) <(git rev-list --first-parent "$HEAD") | head -1)
		COMMITS_SINCE_ANCESTOR=$(git rev-list --count --left-right "$COMMON_ANCESTOR...$HEAD" | cut -f 2)
		RC_NUMBER=$(expr "$COMMITS_SINCE_ANCESTOR" + 1)
	else
		NEXT_PATCH_VERSION=$(expr "$(echo "$LAST_RELEASE_TAG" | cut -d '.' -f 3)" + 1)
		RC_NUMBER=$(git rev-list --count --left-right "$LAST_RELEASE_TAG...$HEAD" | cut -f 2)
	fi

	echo "$MAJORMINOR.$NEXT_PATCH_VERSION.rc-$RC_NUMBER"

	exit
fi

# For feature branches, first determine the nearest release/beta/master branch
ALL_DEPLOY_BRANCHES=$(git branch -r | sed -e 's/ //g' | grep '^origin/master\|^origin/release\|^origin/release-beta')
LOWEST_DEPLOY_BRANCH_DISTANCE=999999
LOWEST_DEPLOY_BRANCH_BRANCH="$BRANCH"
while read -r DEPLOY_BRANCH; do
	DEPLOY_BRANCH_DISTANCE=$(git rev-list --count  --left-right "$(git merge-base "$HEAD" "$DEPLOY_BRANCH")...$HEAD" | cut -f 2)
	if (( "$DEPLOY_BRANCH_DISTANCE" < "$LOWEST_DEPLOY_BRANCH_DISTANCE" )); then
		LOWEST_DEPLOY_BRANCH_DISTANCE="$DEPLOY_BRANCH_DISTANCE"
		LOWEST_DEPLOY_BRANCH_BRANCH="$DEPLOY_BRANCH"
	fi
done <<< "$ALL_DEPLOY_BRANCHES"

# Then determine where this branch was forked from that branch
FORKED_FROM=$(git merge-base "$LOWEST_DEPLOY_BRANCH_BRANCH" "$HEAD")
PARENT_VERSION=$("$DIR/version.sh" "$LOWEST_DEPLOY_BRANCH_BRANCH" "$FORKED_FROM")

# The version of the feature branch is where it was forked from, plus the branch name, plus the number of commits since forkec
echo "$PARENT_VERSION+$BRANCH+$LOWEST_DEPLOY_BRANCH_DISTANCE"
