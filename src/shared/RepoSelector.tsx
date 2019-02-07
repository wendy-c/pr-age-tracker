import React, { SFC } from 'react';

type RepoSelectorProps = {
  name: string;
}

const RepoSelector: SFC<RepoSelectorProps> = ({name}) => 
<div>{name}</div>

export default RepoSelector;